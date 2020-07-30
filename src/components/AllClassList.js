import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
          <div key={index}>
            <button
              onClick={() => {
                enrollHandler(aClass);
              }}
            >
              Enroll
            </button>
            <p>Class Name: {aClass.classname}</p>
            <p>Location: {aClass.location}</p>
            <p>Date: {aClass.date}</p>
            <p>Time: {aClass.time}</p>
            <p>Class Type: {aClass.classtype}</p>
            <p>Duration: {aClass.duration}</p>
            <p>IntensityLevel: {aClass.intensityLevel}</p>
            <p>Current Attendees Number: {aClass.currentAttendeesNo}</p>
            <p>Max Size: {aClass.maxsize}</p>
          </div>
        );
      })}
    </>
  );
};

export default AllClassList;
