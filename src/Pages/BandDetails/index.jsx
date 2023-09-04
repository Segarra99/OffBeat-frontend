import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";

/* Material UI imports */
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const API_URL = "http://localhost:5005";

function BandDetailsPage() {
  const [band, setBand] = useState({});
  const { bandId } = useParams();
  const [value, setValue] = React.useState(0);
  const [hidden, setHidden] = useState(true);

  // Create review
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(0);
  const {user: currentUser} = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bands/${bandId}`)
      .then((response) => setBand(response.data))
      .catch((error) => console.log(error));
  }, []);
  
  useEffect(()=>{
    setUser(currentUser._id);
  })

  let authorization = false;
  if(band.founder._id === currentUser._id){
    authorization = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {content, img, user, rating};

    axios.post(`${API_URL}/api/bands/${bandId}/review`, requestBody)
    .then(() => {
      console.log("Review created successfully");
      setContent('');
      setImg('');
      setUser('');
      setRating(0);
      setHidden(true);
    })
    .catch((error) => console.log(error))

  }

  return (
    <div style={{ paddingTop: "72px" }}>
      <p>{band.name}</p>

      {authorization && <div>fuck</div>}

      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Leave a review</Typography>
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <Rating
          name="simple-controlled"
          value={rating}
          
          onChange={(e, newRating)=> setRating(newRating)}
          onClick={() => setHidden(false)}
        />
        {!hidden && (
          <div>
            <TextField
              id="outlined-multiline-static"
              label=""
              color="primary"
              multiline
              rows={9}
              name="content"
              value={content}
              onChange={(e)=> setContent(e.target.value)}
              sx={{
                bgcolor: "rgba(255,255,255,.6)",
                borderRadius: "5px",
                width: "500px",
              }}
            />
            <input type="file" name="review-picture" className="form-control-file form-control"/>
            <Stack direction="row" spacing={6.6} sx={{marginTop: '8px'}}>
              <Button
                onClick={() => {
                  setRating(0);
                  setHidden(true);
                }}
                variant="outlined"
                sx={{
                  bgcolor: "rgba(255,255,255,.6)",
                  borderRadius: "5px",
                }}
                
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button variant="outlined" sx={{
                  bgcolor: "rgba(255,255,255,.6)",
                  borderRadius: "5px",
                }} endIcon={<FileUploadIcon />}>
                Upload Picture
              </Button>
              <Button variant="contained" endIcon={<SendIcon />} type="submit">
                Post
              </Button>
            </Stack>
          </div>
        )}
        </form>
      </Box>
    </div>
  );
}

export default BandDetailsPage;
