import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ClientClassList from "./ClientClassList";
import AllClassList from "./AllClassList";

const ClientDashboard = () => {
  const [myClasses, setMyClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/client/classes")
      .then((res) => {
        setMyClasses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosWithAuth()
      .get("/client/classes/all")
      .then((res) => {
        setAllClasses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  return (
    <>
      <h2>My Classes</h2>
      <ClientClassList
        classes={myClasses}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <h2>All Classes</h2>
      <AllClassList
        classes={allClasses}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default ClientDashboard;
