import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";



const API_URL = 'http://localhost:5005';

function ProfilePage() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [authorization, setAuthorization] = useState(false);

  const storedToken = localStorage.getItem('authToken')

  useEffect(() => {
    axios.get(`${API_URL}/api/profile/${userId}`, {headers: {
      Authorization: `Bearer ${storedToken}`
    }})
    .then((response) => {
      setUser(response.data.profileUser);
      console.log(response.data.profileUser)
      
    })
    .catch((error) => console.log(error))

  }, [])
  
  useEffect(() => {
    if (user._id === userId) {
      setAuthorization(true);
    }
  }, [user]);

  return (
    <div style={{ paddingTop: '72px' }}>
      <h1>Artist {user.firstName} {user.lastName} profile</h1>
      <h4>Username: {user.username}</h4>
      <h4>From: {user.nationality}</h4>
      {authorization && <Link to={`/profile/${user._id}/edit`}> Update profile</Link>}
    </div>
  );
  
}

export default ProfilePage;
