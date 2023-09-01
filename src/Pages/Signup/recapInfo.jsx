import React from 'react'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';



function RecapInfo(props) {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item container direction="column" xs={24} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Confirm Your Details
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography gutterBottom>Name: {props.firstName} {props.lastName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Username: {props.username}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email: {props.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Nationality: {props.nationality}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Instruments: {props.instruments}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Music Genres: {props.genres}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default RecapInfo;