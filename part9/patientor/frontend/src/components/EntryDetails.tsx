import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import patientService from "../services/patients";

interface EntryDetailsProps {
  date: string;
  details: string;
  specialist: string;
  employer?: string;
  type: string;
  rating: number;
  id: string;
  patientId: string;
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

    window.alert("Are you sure you want to delete this entry?");

    // try {
    //   const { data } = await patientService.deleteEntry(patientId, id);

    //   console.log(data);
    // } catch (error) {}
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
