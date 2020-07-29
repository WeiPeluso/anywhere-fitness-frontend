import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const CreateClass = () => {
  const [formState, setFormState] = useState({
    classname: "",
    location: "",
    date: "",
    time: "",
    classtype: "",
    duration: "",
    intensityLevel: "",
    currentAttendeesNo: 0,
    maxsize: 100,
  });
  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/instructor/classes", formState)
      .then((res) => {
        history.push("/instructor");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChange = (e) => {
    e.persist();
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <FormStyle onSubmit={formSubmit}>
        <FormAlign>
          <SelectContainer>
            Class name:
            <Input
              type="text"
              name="classname"
              placeholder="Create Class Name"
              value={formState.classname}
              onChange={inputChange}
            />
          </SelectContainer>

          <SelectContainer>
            Location:
            <Input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={formState.location}
              onChange={inputChange}
            />
          </SelectContainer>

          <SelectContainer>
            Date:
            <Input
              type="text"
              name="date"
              placeholder="Enter Date"
              value={formState.date}
              onChange={inputChange}
            />
          </SelectContainer>

          <SelectContainer>
            Time:
            <Input
              type="text"
              name="time"
              placeholder="Enter Time"
              value={formState.time}
              onChange={inputChange}
            />
          </SelectContainer>

          <SelectContainer>
            Duration:
            <Input
              type="text"
              name="duration"
              placeholder="Enter Duration"
              value={formState.duration}
              onChange={inputChange}
            />
          </SelectContainer>
          <SelectContainer>
            Intensive Level:
            <Input
              type="text"
              name="intensiveLevel"
              placeholder="Enter Intensive Level"
              value={formState.intensityLevel}
              onChange={inputChange}
            />
          </SelectContainer>
          <SelectContainer>
            Current Attendees No:
            <Input
              type="text"
              name="currentAttendeesNo"
              placeholder="Enter Current Attendees No"
              value={formState.currentAttendeesNo}
              onChange={inputChange}
            />
          </SelectContainer>
          <SelectContainer>
            Max Size:
            <Input
              type="text"
              name="maxsize"
              placeholder="Enter Max Size"
              value={formState.maxsize}
              onChange={inputChange}
            />
          </SelectContainer>
        </FormAlign>
        <Button type="submit">Submit</Button>
      </FormStyle>
    </div>
  );
};

export default CreateClass;

const FormAlign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  max-width: 400px;
  border: 1px solid black;
  padding: 20px;
  border-radius: 10px;
`;
const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Select = styled.select`
  margin: 20px;
  width: 230px;
  border: 2px solid black;
  height: 30px;
  border-radius: 10px;
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
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background: linear-gradient(to right, #aed9e0, #b8f2e6);
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
