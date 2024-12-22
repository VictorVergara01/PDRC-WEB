import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Inicio", path: "/" },
    { text: "Revistas", path: "/revistas" },
    { text: "Artículos", path: "/articulos" },
    { text: "Contacto", path: "/contacto" },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        p: 3,
        background: "linear-gradient(135deg, #121212, #1f1f1f)",
        height: "100%",
        color: "#ffffff",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: "120px",
          mb: 2,
          transition: "all 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
            filter: "drop-shadow(0px 4px 6px rgba(255, 255, 255, 0.2))",
          },
        }}
      />

      <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.3)" }} />

      {/* Menú Items */}
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              textDecoration: "none",
              color: location.pathname === item.path ? "#90caf9" : "#e0e0e0",
              textAlign: "center",
              py: 1,
              borderRadius: "8px",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#90caf9",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                sx: { fontWeight: "bold", letterSpacing: "0.5px" },
              }}
              primary={item.text}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1E3A8A",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: { xs: "60px", md: "80px" },
                  height: "auto",
                  mr: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "rotate(5deg)",
                  },
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                }}
              >
                Portal de Revistas
              </Typography>
            </Box>
          </Link>

          {/* Menú Escritorio */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? "#10B981" : "inherit",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { color: "#10B981" },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Botón Menú Móvil */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ color: "#2575fc" }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Móvil */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "240px",
            animation: "fadeIn 0.3s ease-in-out",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
