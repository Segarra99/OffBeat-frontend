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



function PostDetails() {
    const [post, setPost] = useState({})
    const { user: currentUser } = useContext(AuthContext);
    const [authorization, setAuthorization] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { postId } = useParams();
    useEffect(() => {
        axios.get(`${API_URL}/api/feed/${postId}`)
        .then((response) => {
            setPost(response.data)
            console.log(post)
        })
        .catch((error) => console.log(error))
    })

  return (
    <div style={{ paddingTop: '72px' }}>
        PostDetails
        <img src={post.img} alt="" />
        <p>{post.content}</p>
    </div>
  )
}

export default PostDetails;