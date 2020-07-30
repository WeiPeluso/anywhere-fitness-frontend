import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const InstructorClassList = (props) => {
  return (
    <>
      {props.classes.map((aClass, index) => {
        return (
          <ClassDiv key={index}>
            <ClassLink
              to={{ pathname: `/class/${aClass.id}`, state: aClass }}
              style={{ textDecoration: "none" }}
            >
              <H3>Click Text Below for Class Details</H3>
              <p>Class Name: {aClass.classname}</p>
              <p>Location: {aClass.location}</p>
              <p>Date: {aClass.date}</p>
              <p>Time: {aClass.time}</p>
            </ClassLink>
          </ClassDiv>
        );
      })}
    </>
  );
};

export default InstructorClassList;
const ClassDiv = styled.div`
  border: 2px solid #ffa69e;
  border-radius: 5px;
  background-color: white;
  width: 20%;
  font-size: 20px;
`;

const ClassLink = styled(Link)`
  text-align: center;
  width: 150%;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin: 40px;
  color: #000;
  background-color: #fff;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #b8f2e6;
    box-shadow: 0px 15px 20px r#b8f2e6;
    color: #ffa69e;
    transform: translateY(-7px);
  }
`;
const H3 = styled.h3`
  color: #b8f2e6;
  font-size: 15px;
`;
