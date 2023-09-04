import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import {AuthContext} from '../../Context/auth.context'
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const genreEx = ['rock', 'jazz', 'blues', 'reggae']
const missingEx = ['none','strings', 'percussion', 'keys', 'vocals']

function CreateBandPage() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [missing, setMissing] = useState([]);
  const [founder, setFounder] = useState("");

  const navigate = useNavigate();
  
  const {user} = useContext(AuthContext);

  useEffect(() => {
    setFounder(user._id);
  }, [])
  


  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {name, img, description, genres, missing, founder};

    console.log(requestBody);
    
    axios.post(`${API_URL}/api/bands`, requestBody)
    .then((response) => {
      /* setName('');
      setImg('');
      setDescription('');
      setGenres([]);
      setMissing([]);
      setFounder(); */
      navigate('/bands');
    })
    .catch((error) => console.log(error))

  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Your Band
          </Typography>
          <Box component="form" noValidate encType="multipart/form-data" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <input
                  type="file"
                  accept="image/*"
                  required
                  id="img"
                  style={{ display: 'none' }}
                  onChange={(e) => setImg(e.target.value)}
                />
                <label htmlFor="img">
                  <TextField
                    autoComplete="img"
                    name="img"
                    fullWidth
                    label="Band image"
                    autoFocus
                    value={img}
                    readOnly
                  />
                </label>
                <Button
                  variant="outlined"
                  component="label" // This button acts as the visible trigger for the file input
                  htmlFor="img"
                >
                  Select Image
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Band name"
                  autoFocus
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <InputLabel>Genre selection</InputLabel>
              <Select
                multiple
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected) => (
                  <Stack gap={1} direction="row" flexWrap="wrap">
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={() =>
                          setGenres(
                            instruments.filter((item) => item !== value)
                          )
                        }
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        }
                      />
                    ))}
                  </Stack>
                )}
              >
                {genreEx.map((example) => (
                  <MenuItem
                    key={example}
                    value={example}
                    sx={{ justifyContent: "space-between" }}
                  >
                    {example}
                    {genres.includes(example) ? <CheckIcon color="info" /> : null}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={12} md={6}>
              <InputLabel>Are you missing any band element?</InputLabel>
              <Select
                multiple
                value={missing}
                onChange={(e) => setMissing(e.target.value)}
                input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected) => (
                  <Stack gap={1} direction="row" flexWrap="wrap">
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={() =>
                          setMissing(
                            missing.filter((item) => item !== value)
                          )
                        }
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        }
                      />
                    ))}
                  </Stack>
                )}
              >
                {missingEx.map((example) => (
                  <MenuItem
                    key={example}
                    value={example}
                    sx={{ justifyContent: "space-between" }}
                  >
                    {example}
                    {missing.includes(example) ? <CheckIcon color="info" /> : null}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="description"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                  value={description}
                  onChange={(e)=> setDescription(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Band
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default CreateBandPage;