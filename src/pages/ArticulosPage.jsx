import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Importar useLocation
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Breadcrumbs,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArticleIcon from "@mui/icons-material/Article";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Pagination from "../components/Pagination";
import ArticulosFilter from "../components/ArticulosFilter";

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function ArticulosPage() {
  const location = useLocation();
  const { selectedRevistaId } = location.state || {}; // Obtener el ID de la revista
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("cards");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const itemsPerPage = 21;

  useEffect(() => {
    if (!selectedRevistaId) {
      console.error("No se recibió un ID de revista válido.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [articlesResponse, revistasResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articulos/`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/revistas/`),
        ]);

        const articlesData = articlesResponse.data;
        const revistasData = revistasResponse.data;

        // Filtrar artículos por el ID de la revista seleccionada
        const filteredArticles = articlesData.filter(
          (article) => article.fuente === selectedRevistaId
        );

        // Asignar imágenes solo a los artículos filtrados
        const updatedArticles = filteredArticles.map((article) => {
          const matchingRevista = revistasData.find(
            (revista) => revista.id === article.fuente
          );
          return {
            ...article,
            image: matchingRevista ? matchingRevista.cover_image : "/placeholder.jpg",
          };
        });

        // Extraer categorías únicas solo de los artículos filtrados
        const uniqueCategories = Array.from(
          new Set(
            filteredArticles
              .flatMap((article) =>
                article.subjects_es
                  ? article.subjects_es.split(";").map((subject) => subject.trim())
                  : []
              )
              .filter(Boolean) // Filtrar valores vacíos
          )
        );
        setCategories(uniqueCategories);
        setArticles(updatedArticles);
        setFilteredArticles(updatedArticles);

      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRevistaId]);

  const handleSearch = (query) => {
    const normalizedQuery = normalizeString(query);
    const filtered = articles.filter((article) => {
      const normalizedTitle = normalizeString(article.title_es || "");
      const normalizedDescription = normalizeString(article.descriptions_es || "");
      const normalizedCreator = normalizeString(article.creator || "");
      const normalizedSubject = normalizeString(article.subjects_es || "");

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery) ||
        normalizedCreator.includes(normalizedQuery) ||
        normalizedSubject.includes(normalizedQuery)
      );
    });
    setFilteredArticles(filtered);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    const filtered = category
      ? articles.filter((article) => {
          const subjects = article.subjects_es
            ?.split(";") // Dividir los subjects_es por ";"
            .map((subject) => subject.trim()); // Eliminar espacios en blanco
          return subjects?.includes(category); // Verificar si la categoría seleccionada está en los subjects
        })
      : articles;

    setFilteredArticles(filtered);
    setCurrentPage(1);
};


  const handleViewChange = (event, mode) => {
    if (mode) setViewMode(mode);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentItems = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando artículos...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          py: 2,
          px: 3,
          mb: 3,
          background: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: { xs: 12, md: 15.5 },

        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Inicio
        </Link>
        <Link
          to="/revistas"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          <LibraryBooksIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Revistas
        </Link>
        <Typography
          color="text.primary"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Artículos
        </Typography>
      </Breadcrumbs>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          py: 4,
          px: 2,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          borderRadius: 2,
          marginTop: { xs: 1, md: 1 },

        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontFamily: "'Roboto Slab', serif",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            fontSize: { xs: "2rem", md: "3.5rem" }
          }}
        >
          Explorar Revistas
        </Typography>
        <Typography variant="subtitle1" sx={{
          mb: 2,
          fontFamily: "'Roboto', sans-serif",
          lineHeight: 1.5,
        }}>
          Encuentra artículos científicos y académicos.
        </Typography>
      </Box>

      {/* Filtros */}
      <Box mb={3}>
        <ArticulosFilter
          categories={categories} // Pasamos las categorías extraídas
          selectedCategory={selectedCategory}
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />
      </Box>

      {/* Cambiar Vista */}
      <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              sx={{
                py: 3,
                px: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #ffffff, #f7f9fc)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
        <Typography
                  variant="h6"
                  sx={{
                    mb: { xs: 1, md: 0 },
                    fontSize: { xs: "1.15rem", md: "1.5rem" },
                    color: "#344767",
                    fontWeight: "bold",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
          {filteredArticles.length > 0
            ? `Se encontraron ${filteredArticles.length} artículos`
            : "No hay resultados para mostrar"}
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          sx={{
            "& .MuiToggleButton-root": {
              color: "#6c757d",
              borderColor: "#dee2e6",
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              },
            },
          }}
        >
          <ToggleButton value="cards" aria-label="card view" sx={{ px: 2 }}>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view" sx={{ px: 2 }}>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Resultados */}
      {filteredArticles.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            mt: 2,
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "#f3f6fa",
            color: "#344767",
          }}
        >
          No hay artículos que coincidan con la búsqueda o los filtros aplicados.
        </Alert>
      ) : viewMode === "cards" ? (
        <Grid container spacing={4}>
          {currentItems.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={article.image || "/placeholder.jpg"}
                  alt={article.title_es}
                  sx={{
                    height: 500,
                    width: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6"
                    sx={{
                      color: "#344767",
                      fontWeight: "bold",
                      fontFamily: "'Roboto Slab', serif",
                      mb: 1,
                    }}>
                    {article.title_es}
                  </Typography>
                  <Typography variant="body2"
                    sx={{
                      color: "#6B7280",
                      mb: 2,
                      fontFamily: "'Roboto', sans-serif",
                      lineHeight: 1.5,
                    }}>
                    {article.descriptions_es?.slice(0, 200) ||
                      article.descriptions_en?.slice(0, 200) ||
                      "Sin descripción disponible."}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", fontFamily: "'Roboto', sans-serif" }}>
                    Autor: {article.creator || "Desconocido"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9CA3AF", fontFamily: "'Roboto', sans-serif", mt: 1 }}>
                    Publicado: {article.date || "Fecha no disponible"}
                  </Typography>
                </CardContent>
                <CardActions
                sx={{
                  justifyContent: "flex-end",
                  px: 3,
                  pb: 2,
                }}>
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#155a9c" },
                    }}
                    component={Link}
                    to={`/articulo/${article.id}`}
                  >
                    Ver Detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            p: 0,
            m: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3, // Espaciado entre elementos
          }}
        >
          {currentItems.map((article) => (
            <Box
              component="li"
              key={article.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "flex-start",
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              {/* Imagen */}
              <Box
                component="img"
                src={article.image || "/placeholder.jpg"}
                alt={article.title_es}
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  height: { xs: "150px", sm: "auto" },
                  objectFit: "cover",
                }}
              />

              {/* Contenido */}
              <Box
                sx={{
                  flex: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography variant="h6"sx={{
                    fontWeight: "bold",
                    color: "#344767",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                  >
                  {article.title_es}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {article.descriptions_es?.slice(0, 480) ||
                    article.descriptions_en?.slice(0, 150) ||
                    "Sin descripción disponible."}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      Autor: <strong>{article.creator || "Desconocido"}</strong>
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontFamily: "'Roboto', sans-serif" }}>
                      Publicado: {article.date || "Fecha no disponible"}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/articulo/${article.id}`}
                    size="small"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      "&:hover": { backgroundColor: "#155a9c" },
                    }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

      )}


      {/* Paginación */}
      <Box mt={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}

export default ArticulosPage;
