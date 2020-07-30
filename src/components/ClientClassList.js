import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const ClientClassList = (props) => {
  const cancelEnrollmentHandler = async (aClass) => {
    await axiosWithAuth()
      .delete(`client/classes/${aClass.id}`)
      .then((res) => {
        axiosWithAuth()
          .put(`/client/classes/${aClass.id}`, {
            currentAttendeesNo: aClass.currentAttendeesNo - 1,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.setRefresh(!props.refresh);
      });
  };
  return (
    <>
      {props.classes.map((aClass, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => {
                cancelEnrollmentHandler(aClass);
              }}
            >
              Cancel Enrollment
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

export default ClientClassList;
