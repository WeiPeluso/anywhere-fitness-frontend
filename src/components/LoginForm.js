import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialLoginFormValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  const onLoginTextChange = (evt) => {
    const { name, value } = evt.target;
    setLoginFormValues({ ...loginFormValues, [name]: value });
  };

  const onLoginSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", loginFormValues)
      .then((res) => {
        console.log(res);
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
