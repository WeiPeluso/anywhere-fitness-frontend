import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
const initialLoginFormValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  const history = useHistory();
  const onLoginTextChange = (evt) => {
    const { name, value } = evt.target;
    setLoginFormValues({ ...loginFormValues, [name]: value });
  };

  const onLoginSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/auth/login", loginFormValues)
      .then((res) => {
        const { userid, role } = jwt_decode(token);
        if (res) {
          if (role === "instructor") {
            history.push("/instructor");
          } else {
            history.push("/client");
          }
        } else {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoginFormValues(initialLoginFormValues);
  };
  return (
    <form onSubmit={onLoginSubmit}>
      <label>Username:&nbsp;</label>
      <input
        type="text"
        name="username"
        value={loginFormValues.username}
        onChange={onLoginTextChange}
        placeholder="Enter your user name"
      />

      <label>Password:&nbsp;</label>
      <input
        type="password"
        name="password"
        value={loginFormValues.password}
        onChange={onLoginTextChange}
        placeholder="Enter your password"
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
