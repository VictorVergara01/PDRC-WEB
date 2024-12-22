import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";

function BreadcrumbsNav({ currentPath }) {
  const pages = [
    { name: "Inicio", path: "/", icon: <HomeIcon fontSize="small" /> },
    { name: "Revistas", path: "/revistas", icon: <LibraryBooksIcon fontSize="small" /> },
    { name: "Artículos", path: "/articulos", icon: <ArticleIcon fontSize="small" /> },
    { name: "Contacto", path: "/contacto", icon: <ContactMailIcon fontSize="small" /> },
    { name: "Detalles de Revista", path: "/revista/:id", icon: <LibraryBooksIcon fontSize="small" /> },
    { name: "Detalles de Artículo", path: "/articulo/:id", icon: <ArticleIcon fontSize="small" /> },
  ];

  // Filtrar las páginas según la ruta actual
  const breadcrumbs = pages.filter((page) =>
    currentPath.startsWith(page.path.split(":")[0])
  );

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        py: 2,
        px: 3,
        background: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize: "0.875rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {breadcrumbs.map((page, index) => (
        index < breadcrumbs.length - 1 ? (
          <Link
            key={page.name}
            href={page.path}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {page.icon}
            <Typography
              sx={{ ml: 0.5, fontSize: "inherit", fontWeight: "inherit" }}
            >
              {page.name}
            </Typography>
          </Link>
        ) : (
          <Typography
            key={page.name}
            color="text.primary"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {page.icon}
            <Typography sx={{ ml: 0.5, fontSize: "inherit" }}>
              {page.name}
            </Typography>
          </Typography>
        )
      ))}
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
