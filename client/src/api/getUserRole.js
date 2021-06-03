import { api } from "./index";

const getUserRole = async () => {
  return await api.get("/getUserRole").then((res) => res);
};

export default getUserRole;
