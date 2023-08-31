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

const API_URL = "http://localhost:5005/api";

function BandListPage() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/bands`)
      .then((response) => setBands(response.data))
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
    </div>
  );
}

export default BandListPage;
