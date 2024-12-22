import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        color: "#F0F8FF",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2, color: "#F0F8FF" }}
      >
        Filtrar por Categorías
      </Typography>
      <FormControl fullWidth sx={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}>
        <InputLabel
          id="category-select-label"
          sx={{ color: "#F0F8FF"}}
        >
          Categorías
        </InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={onCategoryChange}
          label="Categorías"
          sx={{
            color: "#F0F8FF",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#F0F8FF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F0F8FF",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F0F8FF",
            },
          }}
        >
          <MenuItem value="" sx={{ color: "#000" }}>
            Todas las Categorías
          </MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category} sx={{ color: "#000" }}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategoryFilter;
