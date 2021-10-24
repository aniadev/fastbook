import React from "react";
// Components
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import NewfeedPanel from "./Newfeed/NewfeedPanel";
import Profile from "./Profile/Profile";
import Messenger from "./Messenger/Messenger";
import RegisterPage from "./Auth/RegisterPage";
import OnlinePanel from "./Popups/OnlinePanel";
import PendingPage from "./PendingPage";
// redux store
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

function HomePage() {
  const auth = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Navbar />
      {(auth.isAuthenticated && !auth.pendingStatus && (
        <>
          <Sidebar />
          <Route path="/" exact component={NewfeedPanel} />
          <Route path="/me" exact component={Profile} />
          <Route path="/messenger" exact component={Messenger} />
          <OnlinePanel />
        </>
      )) ||
        (!auth.isAuthenticated && auth.pendingStatus && (
          <>
            {/* <RegisterPage /> */}
            <PendingPage />
          </>
        )) ||
        (!auth.isAuthenticated && !auth.pendingStatus && <RegisterPage />)}
    </React.Fragment>
  );
  //   if (!auth.isAuthenticated) {
  //     return (
  //       <div className="App">
  //         <Navbar />
  //         <RegisterPage />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="App">
  //         <Navbar />
  //         <Sidebar />
  //         <NewfeedPanel />
  //         <OnlinePanel />
  //       </div>
  //     );
  //   }
}

export default HomePage;
