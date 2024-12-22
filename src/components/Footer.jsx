import React from "react";
import { Box, Typography, Link, IconButton, Divider, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1E3A8A", // Fondo atractivo y profesional
        color: "#fff",
        pt: 6,
        pb: 3,
        px: 3,
      }}
    >
      {/* Contenedor principal */}
      <Grid container spacing={4} sx={{ mb: 3 }}>
        {/* Logo y descripción */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Revistas Científicas
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.8,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Explora las mejores revistas científicas y artículos de
              investigación. Plataforma creada para conectar a investigadores y
              profesionales.
            </Typography>
          </Box>
        </Grid>

        {/* Navegación rápida */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Navegación
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { sm: "center", md: "flex-start" },
                gap: 2,
              }}
            >
              {[
                { text: "Inicio", href: "/" },
                { text: "Revistas", href: "/revistas" },
                { text: "Contacto", href: "/contacto" },
              ].map((item) => (
                <Box
                  key={item.text}
                  component="li"
                  sx={{
                    "&:hover": { transform: "translateY(-2px)", color: "#90caf9" },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link
                    href={item.href}
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      textDecoration: "none",
                      fontWeight: "medium",
                      "&:hover": { color: "#90caf9" },
                    }}
                  >
                    {item.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Redes sociales */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Síguenos
            </Typography>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 2 }}>
              {[
                { icon: <FacebookIcon />, href: "https://www.facebook.com", color: "#3b5998" },
                { icon: <TwitterIcon />, href: "https://www.twitter.com", color: "#1DA1F2" },
                { icon: <LinkedInIcon />, href: "https://www.linkedin.com", color: "#0077b5" },
              ].map((item, index) => (
                <IconButton
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    "&:hover": { backgroundColor: item.color },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Separador */}
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 3 }} />

      {/* Copyright */}
      <Box textAlign="center">
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
          &copy; 2024 SENACYT Portal de Revistas Científicas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
