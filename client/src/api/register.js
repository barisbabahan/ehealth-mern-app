import { api } from "./index";

const register = async (userInfromation) => {
  return await api
    .post("/register", userInfromation)
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const logout = async (token) => {
  return await api
    .post("/logout", token)
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const login = async (userForm) => {
  return await api
    .post("/login", userForm)
    .then((res) => res)
    .catch((res) => res);
};

export default register;
