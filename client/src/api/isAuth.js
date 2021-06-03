import { api } from "./index";

const isAuth = async () => {
  return await api.get("/isauth").then((res) => res);
};

export default isAuth;
