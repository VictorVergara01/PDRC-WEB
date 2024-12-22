import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import CategoryFilter from "./CategoryFilter";
import { FiFilter } from "react-icons/fi";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import "./styles/ArticulosFilter.css";

function ArticulosFilter({
  onSearch,
  categories,
  selectedCategory,
  onCategoryFilter
}) {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleCategoryChange = (event) => {
    onCategoryFilter(event.target.value);
  };

  const handleClearFilters = () => {
    onSearch(""); // Limpia la búsqueda
    onCategoryFilter(""); // Limpia la categoría seleccionada
  };

  return (
    <Box>
      <IconButton
        color="primary"
        onClick={toggleFilters}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1100,
          bgcolor: "primary.main",
          color: "white",
          width: 80,
          height: 80,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
            bgcolor: "primary.dark",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxShadow: "0 0 20px 4px rgba(33, 150, 243, 0.6)",
            animation: "pulse 1.5s infinite",
          },
          "@keyframes pulse": {
            "0%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.1)", opacity: 0.7 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
        }}
      >
        <FiFilter size={50} />
      </IconButton>

      <Drawer
        anchor="right"
        open={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 }, // Expande un poco el ancho
            height: "100%", // Asegura que ocupe todo el alto de la pantalla
            padding: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo transparente
            color: "white", // Texto claro para contraste
            backdropFilter: "blur(10px)", // Efecto de desenfoque
            border: "none", // Eliminar bordes
            overflow: "hidden", // Elimina barras de desplazamiento
          },
        }}
      >
        <Box
          sx={{
            height: "100%", // Asegura que el contenido ocupe toda la altura del Drawer
            display: "flex",
            flexDirection: "column",
            gap: 2, // Espaciado entre elementos
            padding: { xs: 2, md: 3 },
            overflowY: "auto", // Habilita scroll solo si el contenido excede la altura
          }}
        >
          <Button
            onClick={() => setFiltersVisible(false)}
            variant="outlined"
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              borderColor: "white",
              color: "white",
            }}
          >
            X
          </Button>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Divider sx={{ mb: 2, mt: 2, borderColor: "rgba(255, 255, 255, 0.2)" }} />

          <SearchComponent onSearch={onSearch} />
          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.2)" }} />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.2)" }} />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearFilters}
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "secondary.main",
              color: "white",
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            Limpiar Filtros
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default ArticulosFilter;
