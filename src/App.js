import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/login">Login</Link>
        <Link to="/Register">Register</Link>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
      </Router>
    </div>
  );
}

export default App;
