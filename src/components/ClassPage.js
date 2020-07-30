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
            <ButtonDiv2>
              <Button type="submit">Submit</Button>
              <Button onClick={cancelEdit}>Cancel</Button>
            </ButtonDiv2>
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
          </FormStyle>
        </>
      ) : (
        <>
          <MainDiv>
            <H2>Class Details</H2>
            <ButtonDiv>
              <Button onClick={editClassHandler}>Edit the class</Button>
              <Button onClick={deleteHandler}>Delete the class</Button>
            </ButtonDiv>
            <p>Class Name: {aClass.classname}</p>
            <p>Location: {aClass.location}</p>
            <p>Date: {aClass.date}</p>
            <p>Time: {aClass.time}</p>
            <p>Class Type: {aClass.classtype}</p>
            <p>Duration: {aClass.duration}</p>
            <p>IntensityLevel: {aClass.intensityLevel}</p>
            <p>Current Attendees Number: {aClass.currentAttendeesNo}</p>
            <p>Max Size: {aClass.maxsize}</p>
          </MainDiv>
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
  border: 1px solid #ffa69e;
  padding: 20px;
  border-radius: 10px;
`;
const SelectContainer = styled.div`
  display: flex;
  align-items: center;
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
  width: 240px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const H2 = styled.h2`
  color: #b8f2e6;
  font-size: 30px;
  padding-bottom: 10px;
  letter-spacing: 1px;
`;
const MainDiv = styled.div`
  width: 60%;
  border: 4px solid #ffa69e;
  margin: auto;
  margin-top: 100px;
  text-align: center;
  border-radius: 20px;
  font-size: 20px;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  padding-bottom: 20px;
`;

const ButtonDiv2 = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;

  padding-bottom: 20px;
`;
