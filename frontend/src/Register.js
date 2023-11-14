import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from './firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  function saveUserName(inputValue) {
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      const userEmail = user.email; 
      const usernamesRef = collection(firestore, "usernames");

      const docId = `${userEmail}-username`;

      setDoc(doc(usernamesRef, docId), {
        userId: userId,
        username: inputValue,
        timestamp: serverTimestamp(),
      })
        .catch((error) => {
          console.error(`Error saving ${username} as new username. Result:`, error);
        });
    } else {
      console.log("User is not authenticated! Please log in.");
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault(); // prevents page reload upon bad username/pw input
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((user) => {
        if (user) {
          saveUserName(username);
        }
      });
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container">
      <form className="mt-3" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='dark-input'
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='dark-input mt-2'
        /><br/>
        <input
          type="password"
          placeholder="Password (6+ chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='dark-input mt-2'
        /><br/>
        {error && <p>{error}</p>}
        <Button className="mt-2" type="submit">Register</Button><br/>
      </form>
      <p>
        <Link to="/">I'm already registered get me the hell out of here</Link>
      </p>
    </div>
  );
  
};

export default Register;
