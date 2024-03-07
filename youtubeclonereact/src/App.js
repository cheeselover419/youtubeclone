import React from "react";

import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
