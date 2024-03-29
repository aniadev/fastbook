import React, {useState, useEffect} from "react";
// Components
import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
import NewfeedPanel from "./Newfeed";
import Profile from "./Profile";
import Friends from "./Friends";
import Messenger from "./Messenger";
import ModalPostViewer from "./Tools/ModalPostViewer";
import LoginPage from "./Auth/LoginPage";
import OnlinePanel from "./Popups/OnlinePanel";
import PendingPage from "./PendingPage";
import ErrorPage from "./ErrorPage";
// redux store
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import io from "socket.io-client";
import Cookies from "js-cookie";

function HomePage() {
  const auth = useSelector((state) => state.auth);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket = new io();
    if (auth.isAuthenticated) {
      newSocket = io(`${window.location.hostname}:8598`, {
        auth: {
          accessToken: Cookies.get("accessToken"),
        },
      });
      setSocket(newSocket);
    }

    return () => newSocket.close();
  }, [setSocket, auth]);
  return (
    <React.Fragment>
      {(auth.isAuthenticated && !auth.pendingStatus && socket && (
        <>
          <Navbar />
          {/* <Sidebar /> */}
          <Switch>
            <Route path='/' exact component={NewfeedPanel} />
            <Route path='/messenger' component={Messenger} />
            <Route path='/friends' component={Friends} />
            <Route path='/post/:postId' component={ModalPostViewer} />
            <Route path='/post' component={NewfeedPanel} />
            <Route path='/:id/photos' exact component={Profile} />
            <Route path='/:id/posts' exact component={Profile} />
            <Route path='/:id/about' exact component={Profile} />
            <Route path='/:id' exact component={Profile} />
            <Route path='*'>
              <ErrorPage message={`404 NOT FOUND`} />
            </Route>
          </Switch>
          <OnlinePanel socket={socket} />
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
          <LoginPage />
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
