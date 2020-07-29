import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import InstructorDashboard from "./components/InstructorDashboard";
import ClientDashboard from "./components/ClientDashboard";
import CreateClass from "./components/CreateClass";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/login">Login</Link>
        <Link to="/Register">Register</Link>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/instructor" component={InstructorDashboard} />
        <Route exact path="/client" component={ClientDashboard} />
        <Route exact path="/createclass">
          <CreateClass />
        </Route>
      </Router>
    </div>
  );
}

export default App;
