import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ClientRegistration from "./components/ClientRegistration";
import InstructorRegistration from "./components/InstructorRegistration";

import { getToken, removeUserSession, setUserSession } from "./Utils/Common";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`https://anywhere-fitness-ptbw.herokuapp.com/api/auth/login/user`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        localStorage.setItem("token", response.data.token);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/user">
              Client Registration
            </NavLink>
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/instructor">
              Instructor Registration
            </NavLink>
            <small>(Access with token only)</small>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user" component={ClientRegistration} />
              <Route path="/instructor" component={InstructorRegistration} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
