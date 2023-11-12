import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from './firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/main');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <form className="mt-3" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <Button className="mt-2" type="submit">Login</Button>
      </form>
      <p>
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
  
};

export default Login;
