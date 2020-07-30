import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const AllClassList = (props) => {
  const enrollHandler = async (aClass) => {
    await axiosWithAuth()
      .post(`client/classes/${aClass.id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    await axiosWithAuth()
      .put(`/client/classes/${aClass.id}`, {
        currentAttendeesNo: aClass.currentAttendeesNo + 1,
      })
      .then((res) => {
        props.setRefresh(!props.refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {props.classes.map((aClass, index) => {
        return (
          <ClassDiv key={index}>
            <Button
              onClick={() => {
                enrollHandler(aClass);
              }}
            >
              Enroll
            </Button>
            <p>Class Name: {aClass.classname}</p>
            <p>Location: {aClass.location}</p>
            <p>Date: {aClass.date}</p>
            <p>Time: {aClass.time}</p>
            <p>Class Type: {aClass.classtype}</p>
            <p>Duration: {aClass.duration}</p>
            <p>IntensityLevel: {aClass.intensityLevel}</p>
            <p>Current Attendees Number: {aClass.currentAttendeesNo}</p>
            <p>Max Size: {aClass.maxsize}</p>
          </ClassDiv>
        );
      })}
    </>
  );
};

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
  margin: auto;
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

const ClassDiv = styled.div`
  text-align: center;
  width: 150%;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin: 40px;
`;
export default AllClassList;
