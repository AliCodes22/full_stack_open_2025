import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface EntryDetailsProps {
  date: string;
  details: string;
  icon: React.ReactNode;
  specialist: string;
  employer?: string;
  type: string;
  rating: number;
}

const EntryDetails = ({
  date,
  details,
  icon,
  specialist,
  employer,
  rating,
  type,
}: EntryDetailsProps) => {
  const entryStyle = {
    border: "black 4px solid",
    marginBottom: "10px",
  };
  const heartIconStyle = {
    color: rating === 0 ? "green" : "yellow",
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
        </div>
      );
  }
};

export default EntryDetails;
