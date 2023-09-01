import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ProfileInfo(props) {
  const{username, setUsername, email, setEmail, password, setPassword} = props

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Access Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="username"
            label="Username"
            name="username"
            fullWidth
            autoComplete="username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            name="email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="Password"
            name="password"
            type="password"
            fullWidth
            autoComplete="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ProfileInfo;