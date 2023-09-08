import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

const API_URL = "https://offbeat-backend.onrender.com";

//Import Materials UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { FileUploadOutlined } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';


function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [comments, setComments] = useState([]);
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
    setAuthor(user._id);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/feed`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
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

    const requestBody = { content, img, author };

    console.log(requestBody);

    axios
      .post(`${API_URL}/api/feed`, requestBody)
      .then(() => {
        setContent("");
        setImg("");
        setAuthor();
      })
      .catch((error) => console.log(error));
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    axios
      .delete(`${API_URL}/api/feed/${postId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };


  // Like Function
  const likeSubmit = (e, postId) => {
    e.preventDefault();
    setPost(postId);
    axios.put(`${API_URL}/api/feed/${postId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    }).then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // Handle Comment Submit Function
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    setPost(postId);
    const requestBody = { content, author, post: postId };

    console.log(requestBody);

    axios
      .post(`${API_URL}/api/feed/comments`, requestBody)
      .then(() => {
        setContent("");
        setAuthor();
        setPost();
      })
      .catch((error) => console.log(error));
  };

  const deleteComment = (commentId) => {
    /* setPosts((prevPosts) => prevPosts.comments.filter((comment) => comment._id !== commentId)); */
    axios
      .delete(`${API_URL}/api/feed/comments/${commentId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };


  return (
    <div className="list" style={{ paddingTop: "72px" }}>
      <section className="feedPage">

      <div>
        <p></p>
      </div>
      <div className="postsContainer">
      <div className="postForms postsBgWrapper">
      <div className="postsBg">
        <form action="submit" method="POST" className="formContainer">
          <label htmlFor="content">
          <TextField
                id="outlined-multiline-static"
                label="Share your strings"
                color="primary"
                multiline
                rows={9}
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  bgcolor: "rgba(255,255,255,.6)",
                  borderRadius: "10px",
                  width: "900px",
                }}
              />
          </label>
          <div className="formBtns">
          <label htmlFor="img">
            <input
              type="file"
              accept="image/*"
              id="img"
              name="img"
              style={{ display: "none" }}
              onChange={handleImageChange}
              autoComplete="img"
              autoFocus
            />
            <IconButton
              htmlFor="img"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("img").click();
              }}
            >
              <FileUploadOutlined/>
            </IconButton>
          </label>
          {uploading ? (
            <IconButton type="submit" disabled variant="contained" onClick={handleSubmit}>
            <SendIcon/>
          </IconButton>
          ) : (
          <IconButton type="submit" variant="contained" onClick={handleSubmit}>
            <SendIcon/>
          </IconButton>
          )}
          </div>
        </form>
        <div className="mappedResultsContainer">
        {posts.map((post) => (
          <div key={post._id} className="centeredPost">
            <Card sx={{ width: 900, mb: 5, borderRadius: "10px"}}>
              <CardMedia
                component="img"
                height="500"
                image={post.img}
                alt="Post image"
                style={{ objectFit: "contain", backgroundColor: "black"}}
              />
              <CardContent sx={{padding: "0", paddingLeft: "10px", paddingRight: "10px", }}>
                <div className="postContent">
                  <div className="postSets">
                  <span>Created in {new Date(post.createdAt).toLocaleDateString()} by{" "}
                  <Link to={`/profile/${post.author._id}`}>{post.author.firstName} {post.author.lastName}</Link></span>
                  
                    <div className="postBtns">
                    <Link to={`/feed/${post._id}`}>
                      <IconButton>
                        <InfoIcon sx={{ color: "black" }}/>
                      </IconButton>
                    </Link>
                    
                    {post.likes.includes(user._id) ? (
                      <IconButton
                        type="submit"
                        onClick={(e) => {
                          likeSubmit(e, post._id);
                        }}
                      >
                        <FavoriteRoundedIcon sx={{ color: "red" }}/>
                      </IconButton>

                    ) : (

                      <IconButton
                        type="submit"
                        onClick={(e) => {
                          likeSubmit(e, post._id);
                        }}
                      >
                        <FavoriteBorderRoundedIcon sx={{ color: "black" }}/>
                      </IconButton>
                    )}


                    {post.author._id === user._id && (
                      <IconButton
                        type="submit"
                        onClick={() => {
                          deletePost(post._id);
                        }}
                      >
                        <DeleteIcon sx={{ color: "black" }}/>
                      </IconButton>
                    )}
                    </div>
                  </div>
                  {post.content}
                </div>
              </CardContent>
              <CardActions disableSpacing sx={{padding: "0"}}>
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
        ))}
        </div>
        </div>
      </div>
      </div>
      <div>
        <p></p>
      </div>      
      </section>
    </div>
  );
}

export default Feed;
