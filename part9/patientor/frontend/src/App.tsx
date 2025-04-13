import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { Bounce, ToastContainer } from "react-toastify";

import { Patient } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    fetchPatientList();
  }, []);

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </Paper>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Router>
  );
};

export default App;
