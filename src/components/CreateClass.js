import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const CreateClass = () => {
  const token = localStorage.getItem("token");
  const tokenObject = jwt_decode(token);
  const instructorId = tokenObject.userId;
  const history = useHistory();

  const [aClass, setaClass] = useState({
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
  const classInputChange = (evt) => {
    const { name, value } = evt.target;
    setaClass({ ...aClass, [name]: value });
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(aClass);
    axiosWithAuth()
      .post(`/instructor/classes`, aClass)
      .then((res) => {
        history.push(`/instructor`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Class Name: </label>
      <input
        type="text"
        name="classname"
        value={aClass.classname}
        onChange={classInputChange}
      />
      <label>Location: </label>
      <input
        type="text"
        name="location"
        value={aClass.location}
        onChange={classInputChange}
      />
      <label>Date: </label>
      <input
        type="text"
        name="date"
        value={aClass.date}
        onChange={classInputChange}
      />
      <label>Time: </label>
      <input
        type="text"
        name="time"
        value={aClass.time}
        onChange={classInputChange}
      />
      <button type="submit">Submit</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push(`/instructor`);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateClass;
