import React from 'react'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';



function RecapInfo(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Basic information
          </Typography>
          <Typography gutterBottom>{props.username}</Typography>
          <Typography gutterBottom>{props.email}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Account Details
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.firstName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.nationality}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.instruments}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.genres}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default RecapInfo;