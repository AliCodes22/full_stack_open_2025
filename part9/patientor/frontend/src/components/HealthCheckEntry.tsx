import { useState } from "react";
import MultipleSelect from "./MutlipleSelect";
import { Entry, Patient } from "../types";

import patientService from "../services/patients";
import { AxiosError } from "axios";
import { toast, Bounce } from "react-toastify";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const HealthCheckEntry = ({ id, setPatient }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [codes, setCodes] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: Entry = {
      date,
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes: codes,
      type: "HealthCheck",
    };

    try {
      const response = await patientService.addNewEntry(id, newEntry);
      setPatient((prev) =>
        prev ? { ...prev, entries: [...prev.entries, response] } : prev
      );
      toast.success("Entry Created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return response;
    } catch (error: AxiosError) {
      return error.response?.data?.message || error.message;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          New Health Check Entry
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <TextField
            label="Specialist"
            variant="outlined"
            fullWidth
            required
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />

          <TextField
            label="Healthcheck Rating (0-3)"
            type="number"
            fullWidth
            required
            inputProps={{ min: 0, max: 3 }}
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value)}
          />

          <MultipleSelect setCodes={setCodes} codes={codes} />

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ width: "120px", alignSelf: "center", mt: 1 }}
          >
            Add Entry
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default HealthCheckEntry;
