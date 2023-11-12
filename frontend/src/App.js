import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes

import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1 className="mt-4">⚔ DLE GAUNTLET ⚔</h1>
          <nav>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/main" element={<MainPage/>} />
            </Routes>
          </nav>
        </header>
      </div>
    </Router>
  );
}

{ /*I'm making a web app where users can input their wordle and other worlde like game results and see everything on a leaderboard. it's called "Dle Gauntlet" 
It is currently a functioning login and register page powered by firebase. It also has database functionality. It is also hosted by firebase. */ }

export default App;
