import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from './firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // prevents page reload upon bad username/pw input
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container">
      <form className="mt-3" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password (6+ chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
