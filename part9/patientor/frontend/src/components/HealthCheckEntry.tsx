import { useState } from "react";
import MultipleSelect from "./MutlipleSelect";
import { Entry, Patient } from "../types";

import patientService from "../services/patients";
import { AxiosError } from "axios";

const HealthCheckEntry = ({ setDiagnoses, id }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [codes, setCodes] = useState<string[]>([]);

  const inputStyle = {
    border: "none",
    outline: "none",
    padding: "0.5rem",
    backgroundColor: "transparent",
    borderBottom: "2px solid black",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: Entry = {
      date,
      description,
      specialist,
      rating,
      diagnosisCodes: codes,
      type: "HealthCheck",
    };

    try {
      const response = await patientService.addNewEntry(id, newEntry);
      setDiagnoses((prev) => [...prev, response]);

      return response;
    } catch (error: AxiosError) {
      return error.response?.data?.message || error.message;
    }
  };
  return (
    <>
      <form
        style={{
          border: "2px dashed black",
          padding: "1rem",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <h3>New Healthcheck Entry</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            style={inputStyle}
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            style={inputStyle}
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="specialist">Specialist</label>
          <input
            type="text"
            id="specialist"
            style={inputStyle}
            value={specialist}
            required
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="rating">Healthcheck Rating</label>
          <input
            type="text"
            id="rating"
            style={inputStyle}
            value={rating}
            required
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <MultipleSelect setCodes={setCodes} codes={codes} />
        </div>

        <button
          type="submit"
          style={{
            width: "60px",
            background: "#2f9b55",
            border: "2px solid black",
          }}
        >
          Add
        </button>
      </form>
    </>
  );
};

export default HealthCheckEntry;
