import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import patientService from "../services/patients";
import axios, { AxiosError } from "axios";
import { toast, Bounce } from "react-toastify";
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

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "1.25rem",
  marginBottom: "1rem",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0.5rem",
};

const iconStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginLeft: "0.5rem",
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: "#ff4d4f",
  color: "white",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "6px",
  marginTop: "1rem",
  cursor: "pointer",
};

const detailTextStyle: React.CSSProperties = {
  fontStyle: "italic",
  marginBottom: "0.5rem",
};

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
  const heartIconStyle = {
    color: rating === 0 ? "green" : rating === 1 ? "yellow" : "red",
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = window.confirm("Delete this entry?");
    if (!confirm) return;

    try {
      const data = await patientService.deleteEntry(patientId, id);
      setPatient((prev) => (prev ? { ...prev, entries: data } : prev));

      toast.success("Entry Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error: AxiosError | any) {
      toast.error(error?.response?.data?.message || "Failed to delete entry.", {
        autoClose: 4000,
      });
    }
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <span>
          <strong>{date}</strong>
          {type === "HealthCheck" && <MedicalServicesIcon style={iconStyle} />}
          {type === "OccupationalHealthcare" && (
            <>
              <WorkIcon style={iconStyle} /> <small>{employer}</small>
            </>
          )}
          {type === "Hospital" && <LocalHospitalIcon style={iconStyle} />}
        </span>
        {type === "HealthCheck" && (
          <FavoriteIcon style={{ ...iconStyle, ...heartIconStyle }} />
        )}
        {type === "Hospital" && rating >= 0 && (
          <FavoriteIcon style={heartIconStyle} />
        )}
      </div>

      <div style={detailTextStyle}>{details}</div>
      <p>
        <strong>Diagnosed by:</strong> {specialist}
      </p>

      <button onClick={handleDelete} style={deleteButtonStyle}>
        Delete
      </button>
    </div>
  );
};

export default EntryDetails;
