import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = 'http://localhost:5005';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();

      const requestBody = {username, firstName, lastName, email, password};

      axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response)=>{
          navigate('/login')
      })
      .catch((error) =>{
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })
  }

  return (
    <div>

    </div>
  )
}

export default SignupPage;