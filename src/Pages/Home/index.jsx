import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

const API_URL = "http://localhost:5005";

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
      <div className="postForms">
        <form action="submit" method="POST">
          <p>Share your strings</p>
          <label htmlFor="content">
            <textarea
              cols={90}
              rows={7}
              type="text"
              placeholder="Write here..."
              name="content"
              required
              id="content"
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
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
            <button
              htmlFor="img"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("img").click();
              }}
            >
              Select Image
            </button>
          </label>
          <button type="submit" variant="contained" onClick={handleSubmit}>
            Post
          </button>
        </form>
        {posts.map((post) => (
          <div key={post._id}>
            <Card sx={{ width: 900, mb: 20 }}>
              <CardMedia
                component="img"
                height="500"
                image={post.img}
                alt="Post image"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
                Created in {new Date(post.createdAt).toLocaleDateString()} by{" "}
                {post.author.firstName} {post.author.lastName}
              </CardContent>
              {post.author._id === user._id && (
                <button
                  type="submit"
                  onClick={() => {
                    deletePost(post._id);
                  }}
                >
                  Delete
                </button>
              )}
              <CardActions disableSpacing>
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
  );
}

export default Feed;
