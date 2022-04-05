import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByQuery } from "../../redux/actions/actions";
import styles from "./search.module.css";

export default function SearchBar() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

    const handleChange = (e) => {
      e.preventDefault();
      setState(e.target.value);
    };

      const handleSubmit = (e) => {
    e.preventDefault();
    if (state !== "") {
      dispatch(searchByQuery(state));
      setState("");
    }
  };
  const handleEnterKeyPressed = (e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Breed..."
        value={state}
        onKeyPress={handleEnterKeyPressed}
        onChange={handleChange}
        className={styles.input}
      />

      <button className={styles.searchButton} onClick={handleSubmit}>
          Search
        </button>
    </div>
  );
}
