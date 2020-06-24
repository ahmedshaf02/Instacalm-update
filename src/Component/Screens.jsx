import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import CreatePost from "./routes/CreatePost";
import UserProfile from "./routes/UserProfile";
import NotFoundPage from "./routes/NotFoundPage";
import MyFollowingPost from "../Component/routes/MyFollowingPost";

const Screens = () => {
  return (
    <>
      <Switch>
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

        <Route path="/createpost">
          <CreatePost />
        </Route>

        <Route path="/myfollowingpost">
          <MyFollowingPost />
        </Route>

        <Route path="/profile/:id">
          <UserProfile />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

export default Screens;
