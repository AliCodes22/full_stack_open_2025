import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const response = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return response.data;
};

const getSinglePatient = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

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

const deleteEntry = async (patientId: string, entryId: string) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/patients/${patientId}/entries/${entryId}`
    );

    console.log(response);

    return response.data;
  } catch (error) {
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
  deleteEntry,
};
