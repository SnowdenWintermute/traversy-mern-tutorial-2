import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// redux
import { Provider } from "react-redux";
import store from "./store";

// components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";

// actions
import { loadUser } from "./actions/auth";

// utils
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // without the brackets, this will run forever. Else it is like component did mount. the [] is where you can put properties that if they update, will run the func

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert></Alert>
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
