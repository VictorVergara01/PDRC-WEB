import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Use useEffect para desplazarse al inicio cada vez que cambie la página actual
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Generar una lista de números de página
  const getPageNumbers = () => {
    const maxButtons = 5; // Número máximo de botones visibles
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        py: 2,
        px: 3,
        borderRadius: 2,
        backgroundColor: "#f7f9fc",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          px: 2,
          "&:disabled": {
            backgroundColor: "#e0e0e0",
            color: "#9e9e9e",
          },
        }}
      >
        <ArrowBack />
      </Button>

      {/* Botones de números de página */}
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "contained" : "outlined"}
          color={page === currentPage ? "primary" : "default"}
          onClick={() => onPageChange(page)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            minWidth: 36,
            px: 1.5,
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="contained"
        color="primary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          px: 2,
          "&:disabled": {
            backgroundColor: "#e0e0e0",
            color: "#9e9e9e",
          },
        }}
      >
        <ArrowForward />
      </Button>
    </Box>
  );
}

export default Pagination;
