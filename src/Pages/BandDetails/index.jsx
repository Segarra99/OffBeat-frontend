import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
import FileUploadIcon from "@mui/icons-material/FileUpload";

const API_URL = "http://localhost:5005";

function BandDetailsPage() {
  const [band, setBand] = useState({});
  const { bandId } = useParams();
  const [hidden, setHidden] = useState(true);

  // Create review
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const [founder, setFounder] = useState("");
  const [rating, setRating] = useState(0);
  const { user: currentUser } = useContext(AuthContext);
  const [authorization, setAuthorization] = useState(false);
  const [uploading, setUploading] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bands/${bandId}`)
      .then((response) => {
        setBand(response.data);
        setFounder(response.data.founder);
        console.log(response.data)
      })
      .catch((error) => console.log(error));
    }, []);

    useEffect(()=>{
      setUser(currentUser._id);
    }, [founder])

    useEffect(() => {
      if (founder && user === founder._id) {
        setAuthorization(true);
      } else {
        setAuthorization(false);
      }
    }, [founder, user]);

  const handleImageChange = (e) => {
    setUploading(true);

    const uploadData = new FormData();

    uploadData.append("img", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImg(response.data.fileUrl);
        console.log(img);
        setUploading(false);
      })
      .catch((err) => console.log("Error while uploading file:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { content, img, rating };

    axios
      .post(`${API_URL}/api/bands/${bandId}/review`, requestBody, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        console.log("Review created successfully");
        setContent("");
        setImg("");
        setRating(0);
        setHidden(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      <p>{band.name}</p>

      {authorization && <Link to={`/bands/${bandId}/edit`}> Edit</Link>}

      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Leave a review</Typography>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(e, newRating) => setRating(newRating)}
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
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  bgcolor: "rgba(255,255,255,.6)",
                  borderRadius: "5px",
                  width: "500px",
                }}
              />
              <input
                type="file"
                accept="image/*"
                id="img"
                name="review-picture"
                onChange={handleImageChange}
              />
              <Stack direction="row" spacing={6.6} sx={{ marginTop: "8px" }}>
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
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "rgba(255,255,255,.6)",
                    borderRadius: "5px",
                  }}
                  endIcon={<FileUploadIcon />}
                >
                  Upload Picture
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  Post
                </Button>
              </Stack>
            </div>
          )}
        </form>
        {authorization && (  
            <Link to={`/bands/${bandId}/samples`}>Upload Sample</Link>
            )}
            {band.samples &&
        band.samples.map((sample)=>(
            <div key={sample._id}>
            <p>{sample.name}</p>
            <audio controls>
            <source src={sample.audio} type="audio/mpeg"/>
          </audio>
          </div>
          ))}
      </Box>
    </div>
  );
}

export default BandDetailsPage;
