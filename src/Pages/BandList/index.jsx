import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* Material UI imports */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const API_URL = "http://localhost:5005";

function BandListPage() {
  const [bands, setBands] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bands`)
      .then((response) => setBands(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artists`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Link to="/bands/create">Form a Band</Link>
      {bands.map((band) => {
        return (
          <div key={band._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={`/bands/${band._id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={band.img}
                  alt="band image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {band.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {band.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        );
      })}

<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.black' }}>
        {artists.map((artist)=>{
          return (
            <div key={artist._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" src={artist.img} />
              </ListItemAvatar>
              <ListItemText
                primary = {`${artist.firstName} ${artist.lastName}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    </Typography>
                    {artist.description}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{bgcolor: 'white'}}/>
            </div>
            );
          })}
          </List>


    </div>
  );
}

export default BandListPage;