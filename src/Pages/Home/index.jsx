import React, { useEffect, useState, useContext  } from "react";
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
import { CardActionArea } from "@mui/material";




function Feed() {
  const [posts, setPosts] =  useState([]);
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("")
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

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

    const requestBody = { content, img, author};

    console.log(requestBody);

    axios
      .post(`${API_URL}/api/feed`, requestBody)
      .then(() => {
        setContent('');
        setImg('');
        setAuthor();
      })
      .catch((error) => console.log(error));
  }


  return (
        <div className="list" style={{ paddingTop: '72px' }}>
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
            <button htmlFor="img" onClick={() => document.getElementById('img').click()}>
              Select Image
            </button>
          </label>
          <button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Post
          </button>
          </form>
          {posts.map((post) => (
            <div key={post._id}>
              <Card sx={{ width: 900, mb: 20}}>
                <CardActionArea component={Link} to={`/feed/${post._id}`}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={post.img}
                    alt="Post image"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                      <p>Created in {new Date(post.createdAt).toLocaleDateString()} by {post.author.firstName} {post.author.lastName}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              
            </div>
            
          ))}
        </div>
    </div>
  )
}

export default Feed;