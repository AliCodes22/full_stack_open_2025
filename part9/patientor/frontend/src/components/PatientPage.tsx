/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, Patient } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import HealthCheckEntry from "./HealthCheckEntry";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const [diagnoses, setDiagnoses] = useState<Diagnosis | null>(null);
  const iconStyle = {
    height: "20px",
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        return;
      }
      const patientData = await patientService.getSinglePatient(id);
      setPatient(patientData);
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAllDiagnoses();

      setDiagnoses(diagnoses);
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <p>Loading patient data..</p>;
  }

  if (!diagnoses) {
    return <p>No entries found</p>;
  }

  return (
    <>
      <h2>
        {patient.name}
        {patient.gender === Gender.Male ? (
          <MaleIcon style={iconStyle} />
        ) : (
          <FemaleIcon style={iconStyle} />
        )}
      </h2>

      <div>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <HealthCheckEntry setDiagnoses={setDiagnoses} id={id} />

        {}

        {diagnoses && (
          <>
            <h3>Entries</h3>
            {patient.entries.length > 0 ? (
              patient.entries.map((entry: Entry) => (
                <>
                  <EntryDetails
                    date={entry.date}
                    details={entry.description}
                    specialist={entry.specialist}
                    employer={entry.employerName}
                    type={entry.type}
                    rating={entry.healthCheckRating}
                  />
                  {entry.diagnosisCodes && (
                    <ul>
                      {entry.diagnosisCodes.map((code: string) => {
                        const codeEntry = diagnoses.find(
                          (diagnosis: Diagnosis) => diagnosis.code === code
                        );
                        return (
                          <li key={code}>
                            {code} {codeEntry?.name ?? "Unknown diagnosis"}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ))
            ) : (
              <p>No entries found for this patient.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PatientPage;
