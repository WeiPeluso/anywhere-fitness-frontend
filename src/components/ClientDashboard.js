import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ClientClassList from "./ClientClassList";
import AllClassList from "./AllClassList";
import styled from "styled-components";

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
      <H3>Welcome</H3>
      <DashboardContainer>
        <AllClassDiv>
          <H2>All Classes</H2>
          <AllClassList
            classes={allClasses}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </AllClassDiv>

        <MyClassDiv>
          <H2>My Classes</H2>
          <ClientClassList
            classes={myClasses}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </MyClassDiv>
      </DashboardContainer>
    </>
  );
};

export default ClientDashboard;

const H3 = styled.h3`
  color: #b8f2e6;
  font-size: 20px;
`;
const H2 = styled.h2`
  color: #b8f2e6;
  font-size: 30px;
  padding-bottom: 10px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  justify-content: space-around;
`;

const MyClassDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AllClassDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
