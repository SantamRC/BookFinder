import React from "react";
import { useSelector } from "react-redux";
import Add from "../Add/Add";
import Landing from "../Landing/Landing";
import Auth from "../Auth/Auth";

export default function Route({ route }) {
  const token = useSelector(state=>state.token);
  if (token !== "") {
      console.log(token)
    if (route === "add") {
      return <Add />;
    } else if (route === "landing") {
      return <Landing />;
    }
  } else {
    return <Auth />;
  }
}
