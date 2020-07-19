import React from "react";
import Manual from "../Manual";
import Auto from "../Auto";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
function Home() {
  return (
    <>
      <Auto />
    </>
  );
}

export default Home;
