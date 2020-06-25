import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import Screens from "./Component/Screens";
import Navigate from "./Component/Navigate";
import { useDispatch } from "react-redux";
import { userState } from "./Redux/actions";

const Routing = () => {
  return (
    <>
      <Navigate />
      <Screens />
    </>
  );
};

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(userState(user));

    if (user) {
      console.log(user);
    } else {
      history.push("/signin");
    }
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}
