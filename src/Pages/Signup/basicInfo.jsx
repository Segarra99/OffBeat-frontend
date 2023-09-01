import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput, InputLabel, MenuItem, Select, FormControl, Stack, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

function BasicInfo(props) {
  const {firstName, setFirstName, lastName, setLastName, nationality, setNationality,instruments, setInstruments , genres, setGenres, genreEx, instrumentsEx} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Access Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            label="First name"
            name="firstName"
            fullWidth
            autoComplete="firstName"
            variant="standard"
            value={firstName}
            onChange = {(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            label="Last name"
            name="lastName"
            fullWidth
            autoComplete="lastName"
            variant="standard"
            value={lastName}
            onChange = {(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nationality"
            label="Nationality"
            name="nationality"
            fullWidth
            autoComplete="nationality"
            variant="standard"
            value={nationality}
            onChange = {(e) => setNationality(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <InputLabel>Instruments selection</InputLabel>
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
              {instruments.includes(example) ? <CheckIcon color="info" /> : null}
            </MenuItem>
          ))}
        </Select>
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
  )
}

export default BasicInfo