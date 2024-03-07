import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const countLikes = (likes) => {
    return new Set(likes.map((like) => like.user_id)).size;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Video List</h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {videos.map((video) => (
          <div key={video.id} style={{ margin: "10px", width: "300px" }}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            {video.thumbnail && (
              <img
                src={`${video.thumbnail}`}
                alt="Thumbnail"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            )}
            <p>Likes: {countLikes(video.likes)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
