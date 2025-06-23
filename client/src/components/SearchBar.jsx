import React from "react";
import { useState } from "react";
import styles from "../css/SearchBar.module.css";

export default function SearchBar({ onSearch, onRandom }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      // Solo permite números
      setId(value);
      setError("");
    } else {
      setError("Please enter only numbers");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && id) {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (!id) {
      setError("Please enter an ID");
      return;
    }
    onSearch(id);
    setId(""); // Limpiar el input después de la búsqueda
  };

  const handleRandom = () => {
    if (onRandom) {
      onRandom();
    }
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_box}>
        <input
          className={`${styles.input} ${error ? styles.error : ""}`}
          type="text"
          placeholder="Enter character ID..."
          value={id}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          maxLength="3" // Los IDs de Rick and Morty suelen ser de 3 dígitos
        />
        {error && <span className={styles.error_message}>{error}</span>}
      </div>

      <div className={styles.button_group}>
        <button
          className={styles.add_button}
          onClick={handleAdd}
          disabled={!id}
        >
          Add
        </button>

        <button className={styles.random_button} onClick={handleRandom}>
          Random
        </button>
      </div>
    </div>
  );
}
