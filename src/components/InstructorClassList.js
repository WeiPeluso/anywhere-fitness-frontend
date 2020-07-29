import React from "react";
import { Link } from "react-router-dom";

const InstructorClassList = (props) => {
  return (
    <>
      {props.classes.map((aClass, index) => {
        return (
          <div key={index}>
            <Link
              to={{ pathname: `/class/${aClass.id}`, state: aClass }}
              style={{ textDecoration: "none" }}
            >
              <p>Class Name: {aClass.classname}</p>
              <p>Location: {aClass.location}</p>
              <p>Date: {aClass.date}</p>
              <p>Time: {aClass.time}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default InstructorClassList;
