import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const ClassPage = (props) => {
  const { id } = useParams();
  const { role } = jwt_decode(localStorage.getItem("token"));
  const [refresh, setRefresh] = useState(false);
  const [aClass, setAClass] = useState({
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
  const [editClass, setEditClass] = useState({
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

  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`/${role}/classes/${id}`)
      .then((res) => {
        setAClass(res.data);
        setEditClass(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const deleteHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/instructor/classes/${id}`)
      .then((res) => {
        history.push("/instructor");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editClassHandler = (e) => {
    e.preventDefault();
    setEditToggle(true);
  };

  const EditClassChange = (e) => {
    e.preventDefault();
    setEditClass({
      ...editClass,
      [e.target.name]: e.target.value,
    });
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/instructor/classes/${id}`, editClass)
      .then((res) => {
        setAClass(editClass);
        history.push(`/class/${id}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditToggle(false);
      });
  };

  const cancelEdit = (e) => {
    setEditToggle(false);
  };
  return (
    <div>
      {editToggle ? (
        <>
          {" "}
          <FormStyle onSubmit={onEditSubmit}>
            <FormAlign>
              <SelectContainer>
                Class name:
                <Input
                  type="text"
                  name="classname"
                  value={editClass.classname}
                  onChange={EditClassChange}
                />
              </SelectContainer>

              <SelectContainer>
                Location:
                <Input
                  type="text"
                  name="location"
                  value={editClass.location}
                  onChange={EditClassChange}
                />
              </SelectContainer>

              <SelectContainer>
                Date:
                <Input
                  type="text"
                  name="date"
                  value={editClass.date}
                  onChange={EditClassChange}
                />
              </SelectContainer>

              <SelectContainer>
                Time:
                <Input
                  type="text"
                  name="time"
                  value={editClass.time}
                  onChange={EditClassChange}
                />
              </SelectContainer>

              <SelectContainer>
                Duration:
                <Input
                  type="text"
                  name="duration"
                  value={editClass.duration}
                  onChange={EditClassChange}
                />
              </SelectContainer>
              <SelectContainer>
                Intensive Level:
                <Input
                  type="text"
                  name="intensiveLevel"
                  value={editClass.intensityLevel}
                  onChange={EditClassChange}
                />
              </SelectContainer>
              <SelectContainer>
                Current Attendees No:
                <Input
                  type="text"
                  name="currentAttendeesNo"
                  value={editClass.currentAttendeesNo}
                  onChange={EditClassChange}
                />
              </SelectContainer>
              <SelectContainer>
                Max Size:
                <Input
                  type="text"
                  name="maxsize"
                  value={editClass.maxsize}
                  onChange={EditClassChange}
                />
              </SelectContainer>
            </FormAlign>
            <Button type="submit">Submit</Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </FormStyle>
        </>
      ) : (
        <>
          {" "}
          <button onClick={editClassHandler}>Edit the class</button>
          <button onClick={deleteHandler}>Delete the class</button>
          <p>Class Name: {aClass.classname}</p>
          <p>Location: {aClass.location}</p>
          <p>Date: {aClass.date}</p>
          <p>Time: {aClass.time}</p>
          <p>Class Type: {aClass.classtype}</p>
          <p>Duration: {aClass.duration}</p>
          <p>IntensityLevel: {aClass.intensityLevel}</p>
          <p>Current Attendees Number: {aClass.currentAttendeesNo}</p>
          <p>Max Size: {aClass.maxsize}</p>
        </>
      )}
    </div>
  );
};

export default ClassPage;

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
