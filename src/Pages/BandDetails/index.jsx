import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const API_URL = "http://localhost:5005";

function BandDetailsPage() {
  const [band, setBand] = useState({});
  const { bandId } = useParams();
  const [value, setValue] = React.useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bands/${bandId}`)
      .then((response) => setBand(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ paddingTop: "72px" }}>
      <p>{band.name}</p>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Leave a review</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
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
              defaultValue=""
              sx={{
                bgcolor: "rgba(255,255,255,.6)",
                borderRadius: "5px",
                width: "500px",
              }}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "rgba(255,255,255,.6)",
                  borderRadius: "5px",
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Post
              </Button>
            </Stack>
          </div>
        )}
      </Box>
    </div>
  );
}

export default BandDetailsPage;
