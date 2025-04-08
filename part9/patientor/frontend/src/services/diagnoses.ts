import axios, { AxiosResponse } from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAllDiagnoses = async () => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);

  return response.data;
};

export default {
  getAllDiagnoses,
};
