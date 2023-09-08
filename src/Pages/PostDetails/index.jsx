import React from 'react'
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function PostDetails() {
    const [post, setPost] = useState(null)
    const user = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({})
    const [authorization, setAuthorization] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { postId } = useParams();
    const [loading, setLoading] = useState(true); 


    useEffect(() => {
      setCurrentUser(user)
      setAuthorization(true)
    }, [])

    useEffect(() => {
        axios.get(`${API_URL}/api/feed/${postId}`)
        .then((response) => {
          console.log(response)

            setPost(response.data)
            
            setLoading(false)
            
        })
        .catch((error) => console.log(error))
    }, [] )


    

    /* //function to handle likes
    const triggerLike = () => {
      axios
        .post(`${API_URL}/api/feed/${postId}/like`, "", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
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
    }; */

  return (
    <div>
      {!loading && (
    <div style={{ paddingTop: '72px' }}>
      
       <h1>PostDetails</h1>
        <img src={post.img} alt="" />
        <p>{post.content}</p>
        <div>
        <button
            type="submit"
            onClick={() => {
              triggerLike(post._id);
            }}
          >
            <FavoriteBorderIcon/>
          </button>
        
          {authorization && post.author._id === currentUser.user._id &&  (
            <button
              type="submit"
              onClick={() => {
                deletePost(post._id);
              }}
            >
              Delete
            </button>
          )}

          
        </div>
      
    </div>
    )}
    </div>
    
  )
}

export default PostDetails;