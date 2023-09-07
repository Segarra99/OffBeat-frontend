import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

/* Import Material UI components */
import * as React from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const user = useContext(AuthContext);
  const { userId } = useParams();
  const [authorization, setAuthorization] = useState(false);
  const storedToken = localStorage.getItem("authToken");
  const [profileUser, setProfileUser] = useState({});
  const [friendAdded, setFriendAdded] = useState(false);
  const [isFriendAdded, setIsFriendAdded] = useState(false);
  const [friendRequestRemoved, setFriendRequestRemoved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to add friend button
  const addFriend = () => {
    setIsFriendAdded(true);
    setFriendAdded(true);
  };

  // Function to remove friend request button
  const removeFriendRequest = () => {
    setFriendRequestRemoved(true);
    setFriendAdded(false);
    setIsFriendAdded(false);
  };

  // Get profile user information
  useEffect(() => {
    axios
      .get(`${API_URL}/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setProfileUser(response.data.profileUser);

        // Check if user already sent a friend request
        if (response.data.profileUser.friendRequests.includes(user.user._id)) {
          setIsFriendAdded(true);
        }
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  // See if profile is from the user
  useEffect(() => {
    if (profileUser._id === userId) {
      setAuthorization(true);
    }
  }, [profileUser]);

  // Send friend request
  useEffect(() => {
    if (friendAdded) {
      axios
        .put(
          `${API_URL}/api/friend-request/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        .then(() => {
          console.log("Sent friend request");
        })
        .catch((error) => console.log(error));
    }
  }, [friendAdded]);

  // Remove friend request
  useEffect(() => {
    if (friendRequestRemoved) {
      axios
        .put(
          `${API_URL}/api/friend-request/${userId}/remove`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        .then(() => {
          console.log("Removed friend request");
        })
        .catch((error) => console.log(error));
    }
  }, [friendRequestRemoved]);

  console.log(profileUser.samples)

  return (
    <div style={{ paddingTop: "72px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {!isFriendAdded ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<PersonAddIcon />}
              onClick={addFriend}
            >
              Add Friend
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              startIcon={<PersonAddIcon />}
              onClick={removeFriendRequest}
            >
              Remove friend request
            </Button>
          )}
          <h1>
            Artist {profileUser.firstName} {profileUser.lastName} profile
          </h1>
          <img src={profileUser.img} alt="Profile pic" width="100px" />
          <h4>Username: {profileUser.username}</h4>
          <h4>From: {profileUser.country}</h4>
          {profileUser.samples && 
          profileUser.samples.map((sample)=>(
            <div key={sample._id}>
            <p>{sample.name}</p>
            <audio controls>
            <source src={sample.audio} type="audio/mpeg"/>
          </audio>
          </div>
          ))
}
          {authorization && (
            <Link to={`/profile/edit`}> Edit profile</Link>
            )}
          {authorization && (  
            <Link to={`/profile/${userId}/samples`}>Upload Sample</Link>
            )}
        </div>
      )}
      
    </div>
  );
}

export default ProfilePage;
