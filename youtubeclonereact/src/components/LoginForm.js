import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/get-csrf-token/"
        );
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.log("error fetching csrf token: ", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (response.status === 200) {
        console.log("login succesfull");
        navigate("/");
      } else {
        console.log("Login Failed");
        setErrorMessage(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setErrorMessage("An error occurred duging login");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
