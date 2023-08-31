import React from 'react';
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

const API_URL = 'http://localhost:5005';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const {storeToken, authenticateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const requestBody = {email, password}

      axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
          storeToken(response.data.authToken);
/*             debugger; */
          authenticateUser();
/*             debugger; */
          navigate('/')
      })
      .catch((error)=>{
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })
  }
  return (
    <div>

    </div>
  )
}

export default LoginPage;