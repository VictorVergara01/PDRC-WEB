import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { FiFilter } from "react-icons/fi";
import SearchComponent from "./SearchComponent";
import CategoryFilter from "./CategoryFilter";
import InstitutionFilterComponent from "./InstitutionsFilterComponent";

function AllArticlesFilter({
  onSearch,
  onApplyInstitutionFilter,
  institutions,
  selectedInstitutions,
  categories,
  selectedCategory,
  onCategoryFilter,
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
    onApplyInstitutionFilter([]); // Limpia las instituciones seleccionadas
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
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <FiFilter size={24} />
      </IconButton>

      <Drawer
        anchor="right"
        open={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 350 },
            padding: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo transparente
            color: "white", // Texto claro para contraste
            backdropFilter: "blur(10px)", // Efecto de desenfoque
            border: "none", // Eliminar bordes
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "350px" },
            padding: { xs: 2, md: 3 },
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

          <InstitutionFilterComponent
            institutions={institutions}
            selectedInstitutions={selectedInstitutions}
            onApplyInstitutionFilter={onApplyInstitutionFilter}
          />
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

export default AllArticlesFilter;
