import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/auth.context";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { Stack, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const API_URL = "https://offbeat-backend.onrender.com";

function CreateSampleBandPage() {
  const [name, setName] = useState("");
  const [audio, setAudio] = useState("");
  const [band, setBand] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const {bandId} = useParams();
  console.log(bandId)

  useEffect(() => {
    setBand(bandId);
  }, []);

  const handleFile = (e) => {
    setUploading(true);

    const uploadData = new FormData();
    uploadData.append("audio", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload/sample`, uploadData)
      .then((response) => {
        setAudio(response.data.fileUrl);
        console.log(response);
        setUploading(false);
      })
      .catch((err) => console.log("Error while uploading file:", err));
  };

  // Handle Submit Function
  const handleSubmitSample = (e) => {
    e.preventDefault();

    const requestBody = { name, audio, band };

    console.log(requestBody);

    axios
      .post(`${API_URL}/api/bands/samples`, requestBody)
      .then(() => {
        setName("");
        setAudio("");
        setBand("");
        navigate(`/bands/${bandId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="list-container" style={{ paddingTop: "72px" }}>
      <form action="submit" method="POST">
        <p>Share your strings</p>
        <label htmlFor="name">
          <textarea
            cols={90}
            rows={7}
            type="text"
            placeholder="Write here..."
            name="name"
            required
            id="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="audio">
          <input
            type="file"
            accept="audio/*"
            id="audio"
            name="audio"
            style={{ display: "none" }}
            onChange={handleFile}
            autoComplete="audio"
            autoFocus
          />
          <button
            htmlFor="audio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("audio").click();
            }}
          >
            Select Audio
          </button>
        </label>
        {uploading ? (
          <button
            type="submit"
            variant="contained"
            onClick={handleSubmitSample}
            disabled
          >
            Post
          </button>
        ) : (
          <button
            type="submit"
            variant="contained"
            onClick={handleSubmitSample}
          >
            Post
          </button>
        )}
      </form>

      {/* <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 }, opacity: 0.8 }}
            >
              <Typography component="h1" variant="h5">
                Upload Sample
              </Typography>
              <Box
                component="form"
                encType="multipart/form-data"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <input
                      type="file"
                      accept="audio/*"
                      id="audio"
                      name="audio"
                      style={{ display: "none" }}
                      onChange={handleFile}
                    />
                    <label htmlFor="audio">
                      <TextField
                        autoComplete="audio"
                        name="audio"
                        fullWidth
                        label="Audio"
                        autoFocus
                        value={audio}
                        readOnly
                      />
                    </label>
                    <Button
                      variant="outlined"
                      component="label" // This button acts as the visible trigger for the file input
                      htmlFor="audio"
                    >
                      Select Audio
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Audio name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                
                </Grid>
              </Box>
            </Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={handleSubmit}
            >
              Upload
            </Button>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider> */}
    </div>
  );
}

export default CreateSampleBandPage;
