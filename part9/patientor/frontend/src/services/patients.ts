import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getSinglePatient = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  console.log(response.data);

  return response.data;
};

const addNewEntry = async (
  id: string,
  object: Entry
): Promise<Patient | string> => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    }
    return "Error occurred";
  }
};

export default {
  getAll,
  create,
  getSinglePatient,
  addNewEntry,
};
