import React, { useState } from "react";
import { Box, TextField } from "@mui/material";


function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState("");

  const normalizeString = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remueve acentos
      .toLowerCase();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(normalizeString(value));
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Fondo semitransparente
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        color: "#F0F8FF",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por autor, nombre de revista, tema"
        value={query}
        onChange={handleInputChange}
        InputProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo del input con transparencia
            color: "#F0F8FF",
            "& input": {
              color: "#F0F8FF", // Color del texto
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Hover del input
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": {
              borderColor: "#F0F8FF", // Color del borde
            },
            "&:hover fieldset": {
              borderColor: "#ffffff", // Color del borde al hover
            },
          },
        }}
      />
    </Box>
  );
}

export default SearchComponent;
