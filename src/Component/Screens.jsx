import React from "react";
import "./auth.css";
import { Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Home from "./Home";
import CreatePost from "./CreatePost";
import UserProfile from "./UserProfile";

const Screens = () => {
  return (
    <>
      <Route path="/signin">
        <SignIn />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route path="/signup">
        <SignUp />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route  path="/createpost">
        <CreatePost />
      </Route>

      <Route  path="/profile/:id">
        <UserProfile />
      </Route>
    </>
  );
};

export default Screens;
