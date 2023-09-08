import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/auth.context";
const API_URL = "https://offbeat-backend.onrender.com";

//Import MUI
import Avatar from "@mui/material/Avatar";
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

const genreEx = ['Rock', 'Jazz', 'Blues', 'Reggae', 'Pop', 'R&b', 'Classical', 'EDM', 'Rap', 'Techno']
const missingEx = ["none", "strings", "percussion", "keys", "vocals"];

function CreateBandPage() {
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [missing, setMissing] = useState([]);
  const [founder, setFounder] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setFounder(user._id);
  }, []);

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

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, img, description, genres, missing, founder };

    console.log(requestBody);

    axios
      .post(`${API_URL}/api/bands`, requestBody)
      .then(() => {
        setName("");
        setImg("");
        setDescription("");
        setGenres([]);
        setMissing([]);
        setFounder();
        navigate("/bands");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="list-container" style={{ paddingTop: "72px" }}>
      <ThemeProvider theme={defaultTheme}>
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
                Create Your Band
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
                      accept="image/*"
                      id="img"
                      name="band-picture"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="img">
                      <TextField
                        autoComplete="img"
                        name="band-picture"
                        fullWidth
                        label="Band image"
                        autoFocus
                        value={img}
                        readOnly
                      />
                    </label>
                    <Button
                      variant="outlined"
                      component="label" // This button acts as the visible trigger for the file input
                      htmlFor="img"
                    >
                      Select Image
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Band name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel>Genre selection</InputLabel>
                    <Select
                      multiple
                      value={genres}
                      onChange={(e) => setGenres(e.target.value)}
                      input={<OutlinedInput label="Multiple Select" />}
                      renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              onDelete={() =>
                                setGenres(
                                  genres.filter((item) => item !== value)
                                )
                              }
                              deleteIcon={
                                <CancelIcon
                                  onMouseDown={(event) =>
                                    event.stopPropagation()
                                  }
                                />
                              }
                            />
                          ))}
                        </Stack>
                      )}
                    >
                      {genreEx.map((example) => (
                        <MenuItem
                          key={example}
                          value={example}
                          sx={{ justifyContent: "space-between" }}
                        >
                          {example}
                          {genres.includes(example) ? (
                            <CheckIcon color="info" />
                          ) : null}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel>Are you missing any band element?</InputLabel>
                    <Select
                      multiple
                      value={missing}
                      onChange={(e) => setMissing(e.target.value)}
                      input={<OutlinedInput label="Multiple Select" />}
                      renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              onDelete={() =>
                                setMissing(
                                  missing.filter((item) => item !== value)
                                )
                              }
                              deleteIcon={
                                <CancelIcon
                                  onMouseDown={(event) =>
                                    event.stopPropagation()
                                  }
                                />
                              }
                            />
                          ))}
                        </Stack>
                      )}
                    >
                      {missingEx.map((example) => (
                        <MenuItem
                          key={example}
                          value={example}
                          sx={{ justifyContent: "space-between" }}
                        >
                          {example}
                          {missing.includes(example) ? (
                            <CheckIcon color="info" />
                          ) : null}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="description"
                      name="description"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      autoFocus
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
              Create Band
            </Button>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default CreateBandPage;
