import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Функция для получения данных из API
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    // Вызов функции при монтировании компонента
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Video List</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            {video.thumbnail && (
              <img src={`${video.thumbnail}`} alt="Thumbnail" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
