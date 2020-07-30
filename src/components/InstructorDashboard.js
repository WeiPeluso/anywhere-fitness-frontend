import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import InstructorClassList from "./InstructorClassList";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const InstructorDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get("/instructor/classes")
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <>
      <H3>Welcome</H3>
      <Button
        onClick={() => {
          history.push("/createclass");
        }}
      >
        Create a Class
      </Button>
      <MainDiv>
        <InstructorClassList classes={classes} />
      </MainDiv>
    </>
  );
};

const H3 = styled.h3`
  color: #b8f2e6;
  font-size: 20px;
`;

const Button = styled.button`
  width: 200px;
  height: 55px;
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
  margin: 20px;
  margin-bottom: 40px;
  margin-top: 30px;

  &:hover {
    background-color: #b8f2e6;
    box-shadow: 0px 15px 20px #b8f2e6;
    color: #ffa69e;
    transform: translateY(-7px);
  }
  &:focus {
    outline: 0;
  }
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
`;
export default InstructorDashboard;
