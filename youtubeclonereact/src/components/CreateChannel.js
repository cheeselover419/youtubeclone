import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user-info/", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("channelName", channelName);
      formData.append("profilePicture", profilePicture);

      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:8000/create-channel/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`, // Передача токена в заголовке
          },
        }
      );
      console.log("Channel created: ", response.data);
      navigate("/");
    } catch (error) {
      setError("Error creating channel");
      console.error("Error creating channel: ", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div>
      {isAuthenticated ? (
        <form onSubmit={handleCreateChannel}>
          <h2>Create Channel</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>
            Channel Name:
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </label>
          <br />
          <button type="submit">Create Channel</button>
        </form>
      ) : (
        <p>Please log in to create a channel.</p>
      )}
    </div>
  );
};

export default CreateChannel;
