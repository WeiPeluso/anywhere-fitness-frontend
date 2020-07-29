import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Class from "./Class";
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
      <Class classes={classes} />
    </>
  );
};

export default InstructorDashboard;
