import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from './firebase'; 
import GameInput from './GameInput';
import Leaderboard from './Leaderboard';

{/*http://all-the-dles.com/*/}
const MainPage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (auth.currentUser && auth.currentUser.email) {
        const fetchedUsername = await getUsername(auth.currentUser.email);
        setUsername(fetchedUsername);
      }
    };

    fetchUsername();
  }, [auth.currentUser]); 

  const gameInputs = [
    {
      label: "Wordle",
      placeholder: "Enter Wordle results",
      onChange: (newInput) => saveGameResult(newInput, "Wordle"),
      link: "https://www.nytimes.com/games/wordle/index.html",
    },
    {
      label: "Bandle",
      placeholder: "Enter Bandle results",
      onChange: (newInput) => saveGameResult(newInput, "Bandle"),
      link: "https://bandle.app/",
    },
    {
      label: "Travle",
      placeholder: "Enter Travle results",
      onChange: (newInput) => saveGameResult(newInput, "Travle"),
      link: "https://imois.in/games/travle/",
    },
    {
      label: "Connections",
      placeholder: "Enter Connections results",
      onChange: (newInput) => saveGameResult(newInput, "Connections"),
      link: "https://www.nytimes.com/games/connections",
    },
    {
      label: "Listed.fun",
      placeholder: "Enter Listed results",
      onChange: (newInput) => saveGameResult(newInput, "Listed.fun"),
      link: "https://listed.fun/",
    },
  ];

  const openAllLinks = () => {
    gameInputs.forEach((game) => {
      window.open(game.link, "_blank");
    });
  };

  const getUsername = async (userEmail) => {
    const usernamesRef = collection(firestore, "usernames");
    const docId = `${userEmail}-username`;
    const docRef = doc(usernamesRef, docId);
  
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().username;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  };

  const saveGameResult = async (inputValue, gameName) => {
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      const userEmail = user.email;
      const gameResultsRef = collection(firestore, "game_results");
      const docId = `${userEmail}-${gameName}`;
  
      const username = await getUsername(userEmail);
  
      if (username) {
        setDoc(doc(gameResultsRef, docId), {
          userId: userId,
          username: username,  
          game_name: gameName,
          input_value: inputValue,
          timestamp: serverTimestamp(),
        })
        .then(() => {
          console.log(`${gameName} result saved successfully!`);
        })
        .catch((error) => {
          console.error(`Error saving ${gameName} result:`, error);
        });
      } else {
        console.log("Unable to fetch username.");
      }
    } else {
      console.log("User is not authenticated! Please log in.");
    }
  };
  
  return (
    <div className="container">
      <p>Signed in as {username}</p>
      <Button variant="danger" onClick={() => openAllLinks()}>OPEN THE GAUNTLET</Button>
        {gameInputs.map((inputConfig, index) => (
            <GameInput
              label={inputConfig.label}
              placeholder={inputConfig.placeholder}
              value={inputConfig.value}
              onSubmit={inputConfig.onChange}
              link={inputConfig.link}
            />
        ))}
      <Leaderboard/>
    </div>
  );
};

export default MainPage;
