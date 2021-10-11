import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import NewfeedPanel from "./components/Newfeed/NewfeedPanel";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <NewfeedPanel />
    </div>
  );
}

export default App;
