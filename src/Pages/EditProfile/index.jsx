import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/auth.context";
import { useParams } from "react-router-dom";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import CheckIcon from "@mui/icons-material/Check";
import { Stack, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
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
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function EditProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { userId } = useParams();

  const genreEx = ["rock", "jazz", "blues", "reggae"];
  const instrumentsEx = [
    "acoustic guitar",
    "electric guitar",
    "bass",
    "drums",
    "djembe",
    "piano",
    "xylophone",
    "triangle",
  ];

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

    const requestBody = {
      username,
      firstName,
      lastName,
      email,
      country,
      genres,
      description,
      instruments,
    };
    console.log(user)
    axios
      .post(`${API_URL}/api/profile/${userId}/edit`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.log(errorMessage);
      });
  };

  return (
    <div className="edit-container">
      <div className="edit-form">
      <React.Fragment >
        <Typography variant="h4" color="black" gutterBottom>
          Your profile information
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
              id="firstName"
              label="First Name"
              type="firstName"
              name="firstName"
              fullWidth
              autoComplete="firstName"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="lastName"
              label="Last Name"
              type="lastName"
              name="lastName"
              fullWidth
              autoComplete="lastName"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="lastName"
              label="Last Name"
              type="lastName"
              name="lastName"
              fullWidth
              autoComplete="lastName"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="country"
              label="Where are you currently?"
              type="country"
              name="country"
              fullWidth
              autoComplete="country"
              variant="standard"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="description"
              label='Update your "About me" '
              type="description"
              name="description"
              fullWidth
              autoComplete="description"
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel>Learned to play a new one? Nice!</InputLabel>
            <Select
              multiple
              value={instruments}
              onChange={(e) => setInstruments(e.target.value)}
              input={<OutlinedInput label="Multiple Select" />}
              renderValue={(selected) => (
                <Stack gap={1} direction="row" flexWrap="wrap">
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() =>
                        setInstruments(
                          instruments.filter((item) => item !== value)
                        )
                      }
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                    />
                  ))}
                </Stack>
              )}
            >
              {instrumentsEx.map((example) => (
                <MenuItem
                  key={example}
                  value={example}
                  sx={{ justifyContent: "space-between" }}
                >
                  {example}
                  {instruments.includes(example) ? (
                    <CheckIcon color="info" />
                  ) : null}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel>Update your prefered genres to play</InputLabel>
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
                        setGenres(genres.filter((item) => item !== value))
                      }
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
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
                  {genres.includes(example) ? <CheckIcon color="info" /> : null}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </React.Fragment>
            <Grid
            item
            sm={6}
            sx={{ display: "flex", justifyContent: "space-around", width: "40vw"}}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleSubmit}
            >
              Edit Profile
            </Button>
            <Button
              type="submit"
              color="error"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}

            >
              Delete Profile
            </Button>
          </Grid>
      </div>
    </div>
  );
}

export default EditProfilePage;
