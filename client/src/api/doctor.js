import { api } from "./index";

export const addDoctor = async (doctorInformations) => {
  return await api
    .post("/adddoctor", doctorInformations)
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const deleteuser = async (id) => {
  return await api
    .post("/deleteuser", { id: id })
    .then((res) => res)
    .catch((err) => err.message);
};
