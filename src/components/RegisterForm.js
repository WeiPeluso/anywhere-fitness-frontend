import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const initialRegisterFormValues = {
  username: "",
  password: "",
  email: "",
  role: "",
};

const RegisterForm = () => {
  const [registerFormValues, setRegisterFormValues] = useState(
    initialRegisterFormValues
  );
  const history = useHistory();

  const onRegisterTextChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;

    setRegisterFormValues({ ...registerFormValues, [name]: value });
  };

  const onRegisterSubmit = (evt) => {
    console.log("i am here");
    evt.preventDefault();
    axiosWithAuth()
      .post("/auth/register", registerFormValues)
      .then((res) => {
        console.log(res);
        history.push("./login");
      })
      .catch((err) => {
        console.log(err);
      });
    setRegisterFormValues(initialRegisterFormValues);
  };
  return (
    <FormStyle onSubmit={onRegisterSubmit}>
      <label>Username: </label>
      <Input
        type="text"
        name="username"
        value={registerFormValues.username}
        onChange={onRegisterTextChange}
        placeholder="Enter your user name"
      />
      <label>Password: </label>
      <Input
        type="password"
        name="password"
        value={registerFormValues.password}
        onChange={onRegisterTextChange}
        placeholder="Create a password"
      />

      <label>Email: </label>
      <Input
        type="email"
        name="email"
        value={registerFormValues.email}
        onChange={onRegisterTextChange}
        placeholder="Enter your email address"
      />

      <label>Role: </label>
      <Select
        name="role"
        value={registerFormValues.role}
        onChange={onRegisterTextChange}
      >
        <option value=""> -- Please select a role-- </option>
        <option value="instructor">Instructor</option>
        <option value="student">Student</option>
      </Select>

      <button>Submit</button>
    </FormStyle>
  );
};

export default RegisterForm;
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

const Select = styled.select`
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
