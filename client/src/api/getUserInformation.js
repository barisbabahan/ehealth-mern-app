import { api } from "./index";
const getUserInformation = () => {
  return api
    .get("/getuserinfo")
    .then((res) => res)
    .catch((err) => err.message);
};

export default getUserInformation;
