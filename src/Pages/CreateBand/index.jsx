import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:5005';


function CreateBandPage() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenre] = ('');
  const [missing, setMissing] = ('');

  const navigate = useNavigate();

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {name, img, description, genres, missing};

    axios.post(`${API_URL}/api/projects`, requestBody)
    .then(() => {
      setName('');
      setImg('');
      setDescription('');
      setGenre('');
      setMissing('');
      navigate('/bands');
    })
    .catch((error) => console.log(error))

  }
  return (
    <div>

    </div>
  )
}

export default CreateBandPage;