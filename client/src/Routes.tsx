import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { Notes } from "./pages/Notes";

export const Routes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/notes" component={Notes} />

      </Switch>
    </Router>
  );
};
