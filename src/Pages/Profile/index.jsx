import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const API_URL = 'http://localhost:5005';

function ProfilePage() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

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
  


  return (
    <div style={{ paddingTop: '72px' }}>
      <h1>Welcome to your profile, {user.username}</h1>
      <h4>{user.firstName} {user.lastName}</h4>
      {/* Add more user-related information here */}
    </div>
  );
  
}

export default ProfilePage;
