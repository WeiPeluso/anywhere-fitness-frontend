import axios from "axios";

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");
  return axios.create({
    headers: {
      Athorization: token,
    },
    baseURL: "https://anywherefitness-app.herokuapp.com/",
  });
};
