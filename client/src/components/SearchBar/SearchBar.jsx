import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CasinoIcon from "@mui/icons-material/Casino";
import InputAdornment from "@mui/material/InputAdornment";

export default function SearchBar({
  onSearch,
  onRandom,
  placeholder = "Buscar personaje por nombre...",
}) {
  const [query, setQuery] = useState("");

  // Búsqueda en tiempo real
  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleRandom = () => {
    if (onRandom) onRandom();
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      sx={{
        background: "rgba(255,255,255,0.85)",
        borderRadius: 2,
        minWidth: 260,
        maxWidth: 340,
        boxShadow: 1,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {onRandom && (
              <IconButton
                onClick={handleRandom}
                edge="end"
                size="small"
                aria-label="Random"
              >
                <CasinoIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
