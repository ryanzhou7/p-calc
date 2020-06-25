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
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/auto" activeClassName="selected">
                  Auto
                </NavLink>
              </li>
              <li>
                <NavLink to="/manual" activeClassName="selected">
                  Manual
                </NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/manual">
              <Manual />
            </Route>
            <Route path="/auto">
              <Auto />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default Home;
