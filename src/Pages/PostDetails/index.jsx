import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

//Import Material UI
/* Material UI imports */
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { FileUploadOutlined } from "@mui/icons-material";

import InfoIcon from "@mui/icons-material/Info";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

function PostDetails() {
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [authorization, setAuthorization] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem("authToken");

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  useEffect(() => {
    axios
      .get(`${API_URL}/api/feed/${postId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ...

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      // Cleanup the timeout when the component unmounts
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    // Check if post and post.author are defined before accessing _id
    if (post && post.author && post.author._id === user._id) {
      setAuthorization(true);
    }
  }, [!loading]);

  //function to handle likes
  const triggerLike = () => {
    axios
      .post(
        `${API_URL}/api/feed/${postId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        axios
          .get(`${API_URL}/api/feed/${postId}`)
          .then((response) => {
            const updatedPost = response.data;
            setPost(updatedPost);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(post);
  return (
    <div className="detailContainer">
      {!loading && (
        <div className="centeredPost">
          <Card sx={{ width: 900, mb: 5, borderRadius: "10px" }}>
            <CardMedia
              component="img"
              height="500"
              image={post.img}
              alt="Post image"
              style={{ objectFit: "contain", backgroundColor: "black" }}
            />
            <CardContent
              sx={{ padding: "0", paddingLeft: "10px", paddingRight: "10px" }}
            >
              <div className="postContent">
                <div className="postSets">
                  <span>
                    Created in {new Date(post.createdAt).toLocaleDateString()}{" "}
                    by{" "}
                    <Link to={`/profile/${post.author._id}`}>
                      {post.author.firstName} {post.author.lastName}
                    </Link>
                  </span>

                  <div className="postBtns">
                    <Link to={`/feed/${post._id}`}>
                      <IconButton>
                        <InfoIcon sx={{ color: "black" }} />
                      </IconButton>
                    </Link>
                    {post.likes.includes(user._id) ? (
                      <IconButton
                        type="submit"
                        onClick={(e) => {
                          likeSubmit(e, post._id);
                        }}
                      >
                        <FavoriteRoundedIcon sx={{ color: "red" }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        type="submit"
                        onClick={(e) => {
                          likeSubmit(e, post._id);
                        }}
                      >
                        <FavoriteBorderRoundedIcon sx={{ color: "black" }} />
                      </IconButton>
                    )}

                    {post.author._id === user._id && (
                      <IconButton
                        type="submit"
                        onClick={() => {
                          deletePost(post._id);
                        }}
                      >
                        <DeleteIcon sx={{ color: "black" }} />
                      </IconButton>
                    )}
                  </div>
                </div>
                {post.content}
              </div>
            </CardContent>
            <CardActions disableSpacing sx={{ padding: "0" }}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="See comments"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {post.comments.map((comment) => (
                  <div key={comment._id}>
                    <Card sx={{ width: 900, mb: 20 }}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {comment.author.firstName} {comment.author.lastName}
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                          {comment.content}
                        </Typography>
                      </CardContent>
                      {comment.author._id === user._id && (
                        <button
                          type="submit"
                          onClick={() => {
                            deleteComment(comment._id);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </Card>
                  </div>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
