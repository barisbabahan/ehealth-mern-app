import { api } from "./index";

export const getDoctors = async () => {
  return await api
    .get("/viewdoctors")
    .then((res) => res)
    .catch((err) => err);
};

export const getPatients = async () => {
  return await api
    .get("/viewpatients")
    .then((res) => res)
    .catch((err) => err);
};

export const getAvaialableDoctors = async () => {
  return await api
    .get("/getavailabledoctors")
    .then((res) => res)
    .catch((err) => err);
};

export const searchDoctor = async ({ username }) => {
  return await api
    .post("/searchdoctor", { searchInput: username })
    .then((res) => res)
    .catch((err) => err);
};

export const activeDoctor = async (email, callId) => {
  return await api
    .post("/activedoctor", { email: email, callId: callId })
    .then((res) => res)
    .catch((err) => err);
};
