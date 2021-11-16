import React from "react";
// Components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NewfeedPanel from "./Newfeed";
import Profile from "./Profile";
import Friends from "./Friends";
import Messenger from "./Messenger";
import PostViewer from "./Tools/PostViewer";

import RegisterPage from "./Auth/RegisterPage";
import OnlinePanel from "./Popups/OnlinePanel";
import PendingPage from "./PendingPage";
import ErrorPage from "./ErrorPage";
// redux store
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

function HomePage() {
  const auth = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Navbar />
      {(auth.isAuthenticated && !auth.pendingStatus && (
        <>
          <Sidebar />
          <Switch>
            <Route path="/" exact component={NewfeedPanel} />
            <Route path="/messenger" component={Messenger} />
            <Route path="/friends" component={Friends} />
            <Route path="/post/:postId" component={PostViewer} />
            <Route path="/post" component={NewfeedPanel} />
            <Route path="/:id/photos" exact component={Profile} />
            <Route path="/:id/posts" exact component={Profile} />
            <Route path="/:id" exact component={Profile} />
            <Route path="*">
              <ErrorPage message={`404 NOT FOUND`} />
            </Route>
          </Switch>
          <OnlinePanel />
        </>
      )) ||
        (!auth.isAuthenticated && auth.pendingStatus && !auth.errorStatus && (
          <>
            {/* <RegisterPage /> */}
            <PendingPage />
          </>
        )) ||
        (auth.errorStatus && <ErrorPage message={auth.errorMessage} />) ||
        (!auth.isAuthenticated && !auth.pendingStatus && !auth.errorStatus && (
          <RegisterPage />
        ))}
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
