import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Input from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CommentIcon from "@mui/icons-material/Comment";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

/* const API_URL = "https://offbeat-backend.onrender.com"; */
const API_URL = "http://localhost:5005";

const StyledInput = styled(Input)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function Navbar() {
  const { isLoggedIn, user, storeToken, logOutUser, authenticateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElFriends, setAnchorElFriends] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState(null);
  const [anchorElMessages, setAnchorElMessages] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem("authToken");
  const [hiddenMessage, setHiddenMessage] = useState(true);
  const [content, setContent] = useState("");

  const handleSendMessage = (e, userId) => {
    e.preventDefault();

    const requestBody = { content };

    axios
      .post(`${API_URL}/api/message/${userId}/create`, requestBody, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        console.log("Message sent successfully");
        setContent("");
        setHiddenMessage(true);
        tokenUpdate();
        authenticateUser();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteMessage = (e, messageId) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/api/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        console.log("Message deleted successfully");
        setContent("");
        setHiddenMessage(true);
        tokenUpdate();
        authenticateUser();
      })
      .catch((error) => console.log(error));
  };

  /* Menu openings and closing */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenFriends = (event) => {
    setAnchorElFriends(event.currentTarget);
  };

  const handleCloseFriends = () => {
    setAnchorElFriends(null);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleOpenMessages = (event) => {
    setAnchorElMessages(event.currentTarget);
  };

  const handleCloseMessages = () => {
    setAnchorElMessages(null);
  };

  const searchBand = () => {
    navigate(`/bands?searched=${searchQuery}`);
  };

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    async function updateUser() {
      await tokenUpdate();
      await authenticateUser();
    }

    updateUser();
  }, []);

  // Accept friend request
  const acceptFriendRequest = async (friendId) => {
    try {
      await axios.put(
        `${API_URL}/api/friend-request/${friendId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      await tokenUpdate();
      await authenticateUser();
      console.log("Friend request accepted!");
    } catch (error) {
      console.log(error);
    }
  };

  // Decline friend request
  const declineFriendRequest = async (friendId) => {
    try {
      await axios.put(
        `${API_URL}/api/friend-request/${friendId}/decline`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      await tokenUpdate();
      await authenticateUser();
      console.log("Friend request declined!");
    } catch (error) {
      console.log(error);
    }
  };

  // Go to post and remove comment from postNotifications array
  const goToComment = async (postId, commentId) => {
    try {
      await axios.put(
        `${API_URL}/api/notification/${postId}/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      await tokenUpdate();
      await authenticateUser();
      navigate(`/feed/post/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // Go to chat page
  const replyMessage = async (userId) => {
    try {
      await axios.put(
        `${API_URL}/api/message/${messageId}`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      await tokenUpdate();
      await authenticateUser();
      navigate(`/messages/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // funtion to call the backend route updateToken that updates the token everytime the user to perform changes
  const tokenUpdate = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/updateToken`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      storeToken(response.data.authToken);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(hiddenMessage);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100vw",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "60px",
        bgcolor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GraphicEqIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <p>OffBeat</p>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block", width: "100px" }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/about"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block", width: "100px" }}
              >
                About
              </Button>
              <Button
                component={Link}
                to="/bands"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block", width: "100px" }}
              >
                Bands
              </Button>
              <Button
                component={Link}
                to="/contacts"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block", width: "100px" }}
              >
                Contacts
              </Button>
            </Menu>
          </Box>
          <GraphicEqIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OffBeat
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/about"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/bands"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Bands
            </Button>
            <Button
              component={Link}
              to="/contacts"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contacts
            </Button>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInput
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchBand}
            />
          </Search>
          <FormGroup sx={{ ml: "40px", mr: "0", pr: "-80px" }}>
            <FormControlLabel
              sx={{ mr: 0 }}
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              label=""
            />
          </FormGroup>
          {isLoggedIn && (
            <Box sx={{ display: "flex", marginRight: "14px" }}>
              <Tooltip title="See all notifications">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleOpenNotifications}
                >
                  <Badge
                    badgeContent={user.postNotifications.length}
                    color="error"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotifications}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ bgcolor: "transparent", msOverflowY: "scroll" }}
              >
                {user && user.postNotifications.length === 0
                  ? "No notifications"
                  : user.postNotifications.map((notification) => (
                      <div key={notification._id}>
                        <Card
                          sx={{
                            width: 200,
                            mb: 2,
                            height: "15vh",
                            width: "35vw",
                          }}
                        >
                          <Box>
                            <CardMedia
                              component="img"
                              height="40"
                              image={notification.author.img}
                              alt="artist image"
                              sx={{
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                margin: 0,
                                padding: 0,
                              }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                {notification.author.firstName}{" "}
                                {notification.author.lastName} commented: "
                                {notification.content}"
                              </Typography>
                              <div>
                                <Button
                                  variant="contained"
                                  color="error"
                                  startIcon={<CommentIcon />}
                                  onClick={() =>
                                    goToComment(
                                      notification.post,
                                      notification._id
                                    )
                                  }
                                >
                                  Go to post
                                </Button>
                              </div>
                            </CardContent>
                          </Box>
                        </Card>
                      </div>
                    ))}
              </Menu>
            </Box>
          )}
          {isLoggedIn && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "14px",
              }}
            >
              <Tooltip title="See all messages">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleOpenMessages}
                >
                  <Badge badgeContent={user.messages.length} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElMessages}
                open={Boolean(anchorElMessages)}
                onClose={handleCloseMessages}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ bgcolor: "transparent", msOverflowY: "scroll" }}
              >
                {user && user.messages.length === 0
                  ? "No new messages"
                  : user.messages.map((message) => (
                      <div key={message._id}>
                        <Card
                          sx={{
                            width: 200,
                            mb: 2,
                            height: "55vh",
                            width: "35vw",
                          }}
                        >
                          <Box>
                            <CardMedia
                              component="img"
                              height="40"
                              image={message.sender.img}
                              alt="artist image"
                              sx={{
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                margin: 0,
                                padding: 0,
                              }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                {message.sender.firstName}{" "}
                                {message.sender.lastName}: {message.content}
                              </Typography>
                              {hiddenMessage && (
                              <div>
                                <Button
                                  variant="contained"
                                  color="error"
                                  startIcon={<PersonAddIcon />}
                                  onClick={() => setHiddenMessage(false)}
                                >
                                  Reply
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  startIcon={<PersonAddIcon />}
                                  onClick={(e) => handleDeleteMessage(e, message._id)}
                                >
                                  Delete
                                </Button>
                              </div>
                              )}
                              <form
                                onSubmit={(e) =>
                                  handleSendMessage(e, message._id)
                                }
                              >
                                {!hiddenMessage && (
                                  <div>
                                    <TextField
                                      id="outlined-multiline-static"
                                      label=""
                                      color="primary"
                                      multiline
                                      rows={9}
                                      name="content"
                                      value={content}
                                      onChange={(e) =>
                                        setContent(e.target.value)
                                      }
                                      sx={{
                                        bgcolor: "rgba(255,255,255,.6)",
                                        borderRadius: "5px",
                                        width: "500px",
                                      }}
                                    />

                                    {
                                      <Stack
                                        direction="row"
                                        spacing={6.6}
                                        sx={{ marginTop: "8px" }}
                                      >
                                        <Button
                                          onClick={() => {
                                            setContent("");
                                            setHiddenMessage(true);
                                          }}
                                          variant="outlined"
                                          sx={{
                                            bgcolor: "rgba(255,255,255,.6)",
                                            borderRadius: "5px",
                                          }}
                                          startIcon={<DeleteIcon />}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="contained"
                                          endIcon={<SendIcon />}
                                          onClick={(e)=>{handleSendMessage(e, message.sender._id)}}
                                        >
                                          Send
                                        </Button>
                                      </Stack>
                                    }
                                  </div>
                                )}
                              </form>
                            </CardContent>
                          </Box>
                        </Card>
                      </div>
                    ))}
              </Menu>
            </Box>
          )}
          {isLoggedIn && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "14px",
              }}
            >
              <Tooltip title="See all friend requests">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleOpenFriends}
                >
                  <Badge
                    badgeContent={user.friendRequests.length}
                    color="error"
                  >
                    <GroupAddIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElFriends}
                open={Boolean(anchorElFriends)}
                onClose={handleCloseFriends}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ bgcolor: "transparent", msOverflowY: "scroll" }}
              >
                {user && user.friendRequests.length === 0
                  ? "No friend requests"
                  : user.friendRequests.map((friend) => (
                      <div key={friend._id}>
                        <Card
                          sx={{
                            width: 200,
                            mb: 2,
                            height: "15vh",
                            width: "35vw",
                          }}
                        >
                          <Box>
                            <CardMedia
                              component="img"
                              height="40"
                              image={friend.img}
                              alt="artist image"
                              sx={{
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                margin: 0,
                                padding: 0,
                              }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="p"
                                component="div"
                              >
                                {friend.firstName} {friend.lastName}
                              </Typography>
                              <div>
                                <Button
                                  variant="contained"
                                  color="error"
                                  startIcon={<PersonAddIcon />}
                                  onClick={() =>
                                    acceptFriendRequest(friend._id)
                                  }
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<ClearIcon />}
                                  onClick={() =>
                                    declineFriendRequest(friend._id)
                                  }
                                >
                                  Decline
                                </Button>
                              </div>
                            </CardContent>
                          </Box>
                        </Card>
                      </div>
                    ))}
              </Menu>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {isLoggedIn ? <Avatar src={user.img} /> : <Avatar src="/img" />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                <div>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      component={Link}
                      to={`/profile/${user._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Profile</Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      component={Link}
                      onClick={logOutUser}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Log out</Typography>
                    </Button>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      component={Link}
                      to="/signup"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Sign Up</Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      component={Link}
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </Button>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
