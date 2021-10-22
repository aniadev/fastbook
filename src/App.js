import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// Components
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <HomePage />
      </div>
    </Router>
  );
}

export default App;
