import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import InstructorDashboard from "./components/InstructorDashboard";
import ClientDashboard from "./components/ClientDashboard";
import CreateClass from "./components/CreateClass";
import ClassPage from "./components/ClassPage";
import styled from "styled-components";
import jwt_decoded from "jwt-decode";

function App() {
  const [status, setStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setStatus(true);
    }
  }, [refresh]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(true);
    window.location.assign("/login");
    setStatus(false);
  };
  return (
    <Router>
      <div className="App">
        {status ? (
          <StyledNav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login" onClick={logoutHandler}>
              Logout
            </StyledLink>
            <StyledLink to={`/${role}`}>My Page</StyledLink>
            <StyledLink to="/register">Register Now</StyledLink>
          </StyledNav>
        ) : (
          <StyledNav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to={`/${role}`}>My Page</StyledLink>
            <StyledLink to="/register">Register Now</StyledLink>
          </StyledNav>
        )}
      </div>
      <Route
        exact
        path="/login"
        render={(props) => <LoginForm {...props} setRole={setRole} />}
      />

      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/instructor" component={InstructorDashboard} />
      <Route exact path="/client" component={ClientDashboard} />
      <Route exact path="/user" component={LoginForm} />
      <Route exact path="/class/:id" component={ClassPage} />
      <Route exact path="/createclass" component={CreateClass} />
    </Router>
  );
}
const StyledNav = styled.nav`
  height: 7vh;
  background-color: #b8f2e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 3px black;
  font-size: 1.5rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffa69e;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #5e6472;
    color: black;
  }
`;

export default App;
