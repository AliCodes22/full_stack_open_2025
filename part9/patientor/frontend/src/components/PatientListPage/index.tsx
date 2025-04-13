import { useState } from "react";
import {
  Box,
  Container,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Avatar,
  Grid,
  Fab,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { Link } from "react-router-dom";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient: Patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography align="center" variant="h4" gutterBottom>
          Patient Directory
        </Typography>
      </Box>

      <Paper elevation={4}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell align="center">Health Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.id}
                hover
                sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
              >
                <TableCell>
                  <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
                <TableCell align="center">
                  <HealthRatingBar showText={false} rating={1} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />

      <Box mt={4} display="flex" justifyContent="center">
        <Tooltip title="Add New Patient">
          <Fab color="primary" onClick={openModal}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default PatientListPage;
