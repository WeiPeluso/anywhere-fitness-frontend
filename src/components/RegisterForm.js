import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

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
    <form onSubmit={onRegisterSubmit}>
      <label>Username: </label>
      <input
        type="text"
        name="username"
        value={registerFormValues.username}
        onChange={onRegisterTextChange}
        placeholder="Enter your user name"
      />
      <label>Password: </label>
      <input
        type="password"
        name="password"
        value={registerFormValues.password}
        onChange={onRegisterTextChange}
        placeholder="Create a password"
      />

      <label>Email: </label>
      <input
        type="email"
        name="email"
        value={registerFormValues.email}
        onChange={onRegisterTextChange}
        placeholder="Enter your email address"
      />

      <label>
        Role:{" "}
        <select
          name="role"
          value={registerFormValues.role}
          onChange={onRegisterTextChange}
        >
          <option value=""> -- Please select a role-- </option>
          <option value="instructor">Instructor</option>
          <option value="student">Student</option>
        </select>
      </label>

      <button>Submit</button>
    </form>
  );
};

export default RegisterForm;
