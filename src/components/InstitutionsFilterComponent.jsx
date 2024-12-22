import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";import "./styles/InstitutionFilterComponent.css";

function InstitutionFilterComponent({
  institutions = [],
  selectedInstitutions = [],
  onApplyInstitutionFilter,
}) {
  const [selected, setSelected] = useState([...selectedInstitutions]);

  // Sincronizar las selecciones con el estado del padre solo si hay cambios
  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(selectedInstitutions)) {
      setSelected([...selectedInstitutions]);
    }
  }, [selectedInstitutions]);

  // Manejar la selección/deselección de una institución
  const handleToggleSelection = (institution) => {
    const updatedSelection = selected.includes(institution)
      ? selected.filter((inst) => inst !== institution) // Eliminar si ya está seleccionada
      : [...selected, institution]; // Agregar si no está seleccionada

    setSelected(updatedSelection); // Actualizar el estado local
    onApplyInstitutionFilter(updatedSelection); // Notificar al componente padre
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
    <Typography
      variant="h6"
      gutterBottom
      sx={{ fontWeight: "bold", mb: 2, color: "#F0F8FF"}}
    >
      Filtrar por Instituciones
    </Typography>
    <FormGroup>
        {institutions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay instituciones disponibles.
          </Typography>
        ) : (
          institutions.map((institution, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selected.includes(institution)}
                  onChange={() => handleToggleSelection(institution)}
                  sx={{
                    color: "#F0F8FF", // Color por defecto
                    "&.Mui-checked": {
                      color: "#F0F8FF", // Color cuando está seleccionado
                    },
                  }}
                />
              }
              label={institution}
            />
          ))
        )}
      </FormGroup>
  </Box>
  );
}

export default InstitutionFilterComponent;
