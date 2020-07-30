import React, { useState } from "react";
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
      <H2>Register Now</H2>
      <label>
        Username:
        <Input
          type="text"
          name="username"
          value={registerFormValues.username}
          onChange={onRegisterTextChange}
          placeholder="Enter your user name"
        />
      </label>
      <label>
        Password:
        <Input
          type="password"
          name="password"
          value={registerFormValues.password}
          onChange={onRegisterTextChange}
          placeholder="Create a password"
        />
      </label>
      <label>
        Email:
        <Input
          type="email"
          name="email"
          value={registerFormValues.email}
          onChange={onRegisterTextChange}
          placeholder="Enter your email address"
        />
      </label>

      <label>
        Role:
        <Select
          name="role"
          value={registerFormValues.role}
          onChange={onRegisterTextChange}
        >
          <option value=""> -- Please select a role-- </option>
          <option value="instructor">Instructor</option>
          <option value="client">Client</option>
        </Select>
      </label>

      <Button>Submit</Button>
    </FormStyle>
  );
};

export default RegisterForm;
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
  color: #ffa69e;
  background-color: #b8f2e6;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #ffa69e;
    box-shadow: 0px 15px 20px #ffa69e;
    color: #b8f2e6;
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
  letter-spacing: 1px;
`;
