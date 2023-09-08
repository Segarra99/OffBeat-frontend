import React from 'react';
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

const API_URL = 'http://localhost:5005';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BorderAllRounded } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      OffBeat WebApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const {storeToken, authenticateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const requestBody = {username, password}

      axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
          storeToken(response.data.authToken);

          authenticateUser();

          navigate('/')
      })
      .catch((error)=>{
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
      })
  }

  let picsArr = [
    'https://www.pearsonsarmswhitstable.co.uk/assets/img/israel-palacio-459693-1920x1080.jpg',
    'https://media.istockphoto.com/id/1179435850/photo/microphone-microphone-close-up-a-pub-bar-a-restaurant-classical-music-music.jpg?s=612x612&w=0&k=20&c=f74-R0k-QqDMai-Iu7jgyV_MA-Dmxoa9Mtvcg-VlZLs=',
    'https://c1.wallpaperflare.com/preview/569/78/476/bagpipe-scotland-edinburgh-playing-the-bagpipes.jpg',
    'https://w.forfun.com/fetch/9f/9f8f209aae72b4d847b449efb6cdae19.jpeg',
    'https://images.unsplash.com/photo-1580745089072-032cbde08507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNvdXN0aWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1580745089072-032cbde08507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNvdXN0aWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://free4kwallpapers.com/uploads/originals/2015/08/11/guitar.jpg',
    'https://c1.wallpaperflare.com/preview/280/509/163/dark-electric-guitar-musical.jpg',
    'https://wallpapercave.com/wp/wp2727676.jpg',
    'https://www.electronicdrumadvisor.com/wp-content/uploads/2020/08/drum-set-brands.jpg',
    'https://www.vrtxmag.com/site/assets/files/222242/donny_benet-122.jpg'
  ];

  const randomLoginPic = picsArr[Math.floor(Math.random()*picsArr.length-1)];

  return (
    <div className="login-container" style={{ paddingTop: "72px" }}>
      <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '80vh',width: "60vw" }}>
        <CssBaseline />
        <Grid
          className='login-img'
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomLoginPic})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid className='login-form' item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enter
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  )
}

export default LoginPage;