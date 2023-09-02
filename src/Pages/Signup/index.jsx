import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


//import mui
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import BasicInfo from './basicInfo';
import ProfileInfo from './profileInfo';
import RecapInfo from './recapInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {OutlinedInput, InputLabel, MenuItem, Select, FormControl } from "@mui/material";


const API_URL = 'http://localhost:5005';

const defaultTheme = createTheme();

const genreEx = ['rock', 'jazz', 'blues', 'reggae']
const instrumentsEx = ['acoustic guitar', 'electric guitar', 'bass', 'drums', 'djembe', 'piano', 'xylophone', 'triangle']

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [instruments, setInstruments] = useState([])
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  /* SUBMIT FUNCTION */
  const handleSubmit = (e) => {
      e.preventDefault();

      const requestBody = {username, firstName, lastName, email, password, nationality, genres};

      axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response)=>{
          navigate('/login')
      })
      .catch((error) =>{
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
          console.log(errorMessage);
      })
  }


  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          OffBeat WebApp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  /* FORM STEPS */
  const steps = ['Basic information', 'Account details', 'Review your information'];

  /* function getStepContent(step) {
    switch (step) {
      case 0:
        return <ProfileInfo/>;
      case 1:
        return <BasicInfo/>;
      case 2:
        return <RecapInfo/>;
      default:
        throw new Error('Unknown step');
    }
  } */
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProfileInfo
            username={username}
            email={email}
            password={password}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        );
      case 1:
        return (
          <BasicInfo
            firstName={firstName}
            lastName={lastName}
            nationality={nationality}
            instruments={instruments}
            genres={genres}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setNationality={setNationality}
            setInstruments={setInstruments}
            setGenres={setGenres}
            genreEx={genreEx}
            instrumentsEx={instrumentsEx}
          />
        );
      case 2:
        return (
          <RecapInfo
            username={username}
            email={email}
            firstName={firstName}
            lastName={lastName}
            nationality={nationality}
            instruments={instruments}
            genres={genres}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };


  const [activeStep, setActiveStep] = React.useState(0);

  /* FUNCTIONS TO ADVANCE IN FORM OR GO BACK */
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                All set!
              </Typography>
              <Typography variant="subtitle1">
                We are glad you decided to join our community. Your account was set and from now on, feel free to roam in the app and connect with other artists and bands.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Complete signing up' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )} 
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  )
}

export default SignupPage;