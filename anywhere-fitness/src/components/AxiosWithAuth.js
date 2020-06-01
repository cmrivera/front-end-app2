import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://anywhere-fitness-ptbw.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};
export default axiosWithAuth;
