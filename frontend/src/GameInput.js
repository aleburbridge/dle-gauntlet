import React from 'react';
import './App.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from "react";

const GameInput = ({ label, placeholder, link, onSubmit }) => {
  const [inputValue, setInputValue] = useState(""); 

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = () => {
    onSubmit(inputValue); 
    setInputValue(""); 
  };

  return (
    <Form.Group controlId={label.toLowerCase()}>
      <InputGroup className='mt-4'>
        <Button variant="secondary" href={link} target="_blank">
          Link
        </Button>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className='dark-input'
        />
        <Button variant="outline-danger" onClick={handleFormSubmit}>
          Submit
        </Button>
      </InputGroup>
    </Form.Group>
  );
};

export default GameInput;