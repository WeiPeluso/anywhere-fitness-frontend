import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import InstructorClassList from "./InstructorClassList";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  const createClassHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/createclass">Create a Class</Link>
      <InstructorClassList classes={classes} />
    </>
  );
};

export default InstructorDashboard;
