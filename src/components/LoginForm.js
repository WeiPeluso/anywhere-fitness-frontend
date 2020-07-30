import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
const initialLoginFormValues = {
  username: "",
  password: "",
};

const LoginForm = (props) => {
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
        const { role } = jwt_decode(res.data.token);
        props.setRole(role);
        props.setRefresh(!props.refresh);
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
      <H2>Login</H2>
      <label>
        Username:&nbsp;
        <Input
          type="text"
          name="username"
          value={loginFormValues.username}
          onChange={onLoginTextChange}
          placeholder="Enter your user name"
        />
      </label>

      <label>
        Password:&nbsp;
        <Input
          type="password"
          name="password"
          value={loginFormValues.password}
          onChange={onLoginTextChange}
          placeholder="Enter your password"
        />
      </label>
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
  font-size: 15px;
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
  margin-top: 20px;

  &:hover {
    background-color: #b8f2e6;
    box-shadow: 0px 15px 20px r#b8f2e6;
    color: #ffa69e;
    transform: translateY(-7px);
  }
  &:focus {
    outline: 0;
  }
`;
const FormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Slab", serif;
  margin-top: 60px;
`;

const H2 = styled.h2`
  color: #b8f2e6;
  font-size: 30px;
  padding-bottom: 10px;
  letter-spacing: 2px;
`;
