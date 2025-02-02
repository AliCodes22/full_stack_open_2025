import { useState } from "react";
import axios from "axios";

const Search = ({ search, onChange }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <p>
        Find countries: <input value={search} onChange={onChange} />
      </p>
    </form>
  );
};

export default Search;
