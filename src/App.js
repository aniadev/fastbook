import React from "react";
import "./App.css";
// Components
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import NewfeedPanel from "./components/Newfeed/NewfeedPanel";
// Redux
import store from "./store/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Sidebar />
        <NewfeedPanel />
      </div>
    </Provider>
  );
}

export default App;
