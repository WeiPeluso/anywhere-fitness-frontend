import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
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
        localStorage.setItem("token", res.data.token);
        const { userid, role } = jwt_decode(res.data.token);
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
    <FormStyle onSubmit={onLoginSubmit}>
      <label>Username:&nbsp;</label>
      <Input
        type="text"
        name="username"
        value={loginFormValues.username}
        onChange={onLoginTextChange}
        placeholder="Enter your user name"
      />

      <label>Password:&nbsp;</label>
      <Input
        type="password"
        name="password"
        value={loginFormValues.password}
        onChange={onLoginTextChange}
        placeholder="Enter your password"
      />
      <Button>Login</Button>
    </FormStyle>
  );
};

export default LoginForm;

const Input = styled.input`
  margin: 20px;
  width: 230px;
  border: 2px solid black;
  height: 30px;
  border-radius: 10px;
  padding: 5px 10px;
  &:focus {
    outline: 0;
  }
`;

const Button = styled.button`
  width: 140px;
  height: 45px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;

  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  &:focus {
    outline: 0;
  }
`;
const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
