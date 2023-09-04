import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import {AuthContext} from '../../Context/auth.context'
import { useParams } from 'react-router-dom';
const API_URL = 'http://localhost:5005';

//Import MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {OutlinedInput, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { Stack, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";


const defaultTheme = createTheme();

const genreEx = ['rock', 'jazz', 'blues', 'reggae']
const missingEx = ['none','strings', 'percussion', 'keys', 'vocals']



function EditBandPage() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [missing, setMissing] = useState([]);

  const { bandId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bands/${bandId}`)
      .then((response) => {
        const foundBand = response.data;
        setName(foundBand.name);
        setImg(foundBand.img);
        setDescription(foundBand.description);
        setGenres(foundBand.genres);
        setMissing(foundBand.missing);
      })
      .catch((error) => console.log(error));
  }, [bandId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {name, img, description, genres, missing};

    console.log(requestBody);
    
    axios
      .put(`${API_URL}/api/bands/${bandId}`, requestBody)
      .then(() => {
        navigate(`/bands/${bandId}`);
      })
      .catch((error) => console.log(error));
  }

  // request to delete stuff and if successful navigate to bands
  const deleteBand = () => {
    axios
      .delete(`${API_URL}/api/bands/${bandId}`)
      .then(() => {
        navigate("/bands");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default EditBandPage;