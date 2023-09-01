import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function BasicInfo(props) {
  const {firstName, setFirstName, lastName, setLastName, nationality, setNationality,instruments, setInstruments , genres, setGenres} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Access Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            label="First name"
            name="firstName"
            fullWidth
            autoComplete="firstName"
            variant="standard"
            value={firstName}
            onChange = {(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            label="Last name"
            name="lastName"
            fullWidth
            autoComplete="lastName"
            variant="standard"
            value={lastName}
            onChange = {(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nationality"
            label="Nationality"
            name="nationality"
            fullWidth
            autoComplete="nationality"
            variant="standard"
            value={nationality}
            onChange = {(e) => setNationality(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="instruments"
            label="Instruments"
            name="instruments"
            fullWidth
            autoComplete="instruments"
            variant="standard"
            value={instruments}
            onChange = {(e) => setInstruments(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="genres"
            label="Genres"
            name="genres"
            fullWidth
            autoComplete="genres"
            variant="standard"
            value={genres}
            onChange = {(e) => setGenres(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default BasicInfo