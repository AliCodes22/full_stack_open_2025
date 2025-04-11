import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import patientService from "../services/patients";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Patient } from "../types";

interface EntryDetailsProps {
  date: string;
  details: string;
  specialist: string;
  employer?: string;
  type: string;
  rating: number;
  id: string;
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const EntryDetails = ({
  date,
  details,
  patientId,
  specialist,
  employer,
  rating,
  type,
  id,
  setPatient,
}: EntryDetailsProps) => {
  // styles
  const entryStyle = {
    border: "black 4px solid",
    marginBottom: "10px",
  };

  const heartIconStyle = {
    color: rating === 0 ? "green" : "yellow",
  };

  const deleteButtonStyle = {
    backgroundColor: "red",
    padding: "2px",
    width: "5em",
    border: "2px solid red",
  };

  // handlers
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirm = window.confirm("Delete this entry?");

    if (confirm) {
      try {
        const data = await patientService.deleteEntry(patientId, id);

        setPatient((prev) => (prev ? { ...prev, entries: data } : prev));
        toast("Deleted");
      } catch (error: AxiosError) {
        if (axios.isAxiosError(error)) {
          const handleDelete = async (e: React.FormEvent) => {
            e.preventDefault();

            const confirm = window.confirm("Delete this entry?");

            if (confirm) {
              try {
                const { data } = await patientService.deleteEntry(
                  patientId,
                  id
                );
                console.log(data);
              } catch (error) {
                alert("Failed to delete entry: " + error.message);
              }
            }
          };
        }
      }
    }
  };

  switch (type) {
    case "HealthCheck":
      return (
        <div style={entryStyle}>
          <div>
            <p>
              {date}
              <MedicalServicesIcon />
            </p>
          </div>

          <div>
            <i>{details}</i>
          </div>

          <div>
            <FavoriteIcon style={heartIconStyle} />
          </div>
          <p>Diagnose by {specialist}</p>

          <div>
            <button
              onClick={handleDelete}
              style={deleteButtonStyle}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={entryStyle}>
          <p>
            {date} <WorkIcon /> {employer}
          </p>
          <div>
            <i>{details}</i>
          </div>

          <p>Diagnose by {specialist}</p>
          <div>
            <button
              onClick={handleDelete}
              style={deleteButtonStyle}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      );
    case "Hospital":
      return (
        <div style={entryStyle}>
          <p>
            {date} <LocalHospitalIcon />
          </p>

          <div>
            <i>{details}</i>
          </div>
          <div>{rating && <FavoriteIcon />}</div>
          <p>Diagnose by {specialist}</p>
          <div>
            <button
              onClick={handleDelete}
              style={deleteButtonStyle}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      );
  }
};

export default EntryDetails;
