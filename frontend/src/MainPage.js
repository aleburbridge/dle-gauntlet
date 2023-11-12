import { Button } from 'react-bootstrap';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from './firebase'; 
import GameInput from './GameInput';
import Leaderboard from './Leaderboard';

{/*http://all-the-dles.com/*/}
const MainPage = () => {
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


  function saveGameResult(inputValue, gameName) {
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      const userEmail = user.email; 
      const gameResultsRef = collection(firestore, "game_results");

      const docId = `${userEmail}-${gameName}`;

      setDoc(doc(gameResultsRef, docId), {
        userId: userId,
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
      console.log("User is not authenticated. Please log in.");
    }
  }
  
  return (
    <div className="container">
      <Button variant="danger" onClick={() => openAllLinks()}>OPEN THE GAUNTLET</Button>
      <div className="w-50 mx-auto">
        {gameInputs.map((inputConfig, index) => (
            <GameInput
              label={inputConfig.label}
              placeholder={inputConfig.placeholder}
              value={inputConfig.value}
              onSubmit={inputConfig.onChange}
              link={inputConfig.link}
            />
        ))}
      </div>
      <Leaderboard/>
    </div>
  );
};

export default MainPage;
