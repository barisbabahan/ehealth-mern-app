import axios from "axios";

export const api = axios.create({
  baseURL: "https://ehealth-api.herokuapp.com/",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);
