import React, { useState } from "react";

const Class = (props) => {
  return (
    <>
      {props.classes.map((aClass, index) => {
        return (
          <>
            {" "}
            <label>Class</label>
            <p>{aClass.classname}</p>
            <label>Location</label>
            <p>{aClass.location}</p>
            <label>Date</label>
            <p>{aClass.date}</p>
            <label>Time</label>
            <p>{aClass.time}</p>
            <label>Class Type</label>
            <p>{aClass.classtype}</p>
            <label>Duration</label>
            <p>{aClass.duration}</p>
            <label>Intensity Level</label>
            <p>{aClass.intensityLevel}</p>
            <label>Current Attendees Number</label>
            <p>{aClass.currentAttendeesNo}</p>
            <label>maxsize</label>
            <p>{aClass.maxsize}</p>
          </>
        );
      })}
    </>
  );
};

export default Class;
