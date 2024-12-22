import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    Alert,
    CircularProgress,
    Chip,
    Breadcrumbs,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import { FaBook, FaCalendarAlt, FaExternalLinkAlt, FaGlobe } from "react-icons/fa";

function ArticuloPage() {
    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState("es");

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/articulos/${id}/`
                );
                setArticulo(response.data);
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticulo();
    }, [id]);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    if (loading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <CircularProgress />
                <Typography variant="h6" mt={2}>
                    Cargando detalles del artículo...
                </Typography>
            </Box>
        );
    }

    if (!articulo) {
        return (
            <Container>
                <Box textAlign="center" mt={5}>
                    <Alert severity="error">No se encontraron los detalles del artículo.</Alert>
                </Box>
            </Container>
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
                    marginTop: { xs: 10, md: 15.5 },

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
                <Link
                    to={`/revista/${articulo.fuente}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#1976d2",
                        fontWeight: "bold",
                    }}
                >
                    <DescriptionIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Detalles de Revista
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
                    Artículo
                </Typography>
            </Breadcrumbs>
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                    mt: 4,
                    mb: 4,
                    py: 4,
                    px: 2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    color: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    marginTop: { xs: 1, md: 1 },
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontSize: { xs: "2rem", md: "3.5rem" },
                        fontWeight: "bold",
                    }}
                >
                    {articulo.title_es}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", opacity: 0.9 }}>
                    Detalles del artículo y temas principales
                </Typography>
            </Box>

            {/* Detalles principales */}
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" color="primary" gutterBottom>
                                {articulo.title_es}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#6B7280", lineHeight: 1.6, mb: 2 }}
                            >
                                {selectedLanguage === "es"
                                    ? articulo.descriptions_es || "No hay descripción disponible."
                                    : articulo.descriptions_en || "Description not available."}
                            </Typography>
                            <Box mb={2}>
                                <Typography variant="body1">
                                    <FaBook className="icon" />
                                    <strong> Autor:</strong> {articulo.creator || "No especificado"}
                                </Typography>
                                <Typography variant="body1">
                                    <FaCalendarAlt className="icon" />
                                    <strong> Fecha de Publicación:</strong>{" "}
                                    {articulo.date || "No disponible"}
                                </Typography>
                                <Typography variant="body1">
                                    <FaGlobe className="icon" />
                                    <strong> Idioma:</strong>{" "}
                                    {articulo.language === "spa" ? "Español" : "Inglés"}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Temas:</strong>
                                </Typography>
                                {articulo.subjects_es && articulo.subjects_es.trim() ? (
                                    articulo.subjects_es
                                        .split(";")
                                        .map((topic, index) => (
                                            <Chip
                                                key={index} // Usar índice como key si los valores no son únicos
                                                label={topic.trim()} // Aseguramos que no haya espacios innecesarios
                                                sx={{
                                                    margin: 0.5,
                                                    backgroundColor: "#1976d2",
                                                    color: "#fff",
                                                }}
                                            />
                                        ))
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        No hay temas disponibles.
                                    </Typography>
                                )}
                            </Box>

                            {articulo.identifier && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    href={articulo.identifier_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                                >
                                    Ver artículo oficial <FaExternalLinkAlt style={{ marginLeft: 8 }} />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Información adicional */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        marginBottom: { xs: 0, md: 10 }, // Añadido margen inferior
                    }}
                >
                    <Card
                        sx={{
                            padding: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                        }}
                    >
                        <Typography variant="h6" color="primary" gutterBottom>
                            Información Adicional
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#6B7280", lineHeight: 1.6, mb: 2 }}
                        >
                            <strong>Formato:</strong> {articulo.format || "No especificado"}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#6B7280", lineHeight: 1.6, mb: 2 }}
                        >
                            <strong>Tipo de Recurso:</strong>{" "}
                            {articulo.sources || "No especificado"}
                        </Typography>
                        {articulo.relation && (
                            <Button
                                variant="contained"
                                color="primary"
                                href={articulo.relation}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                            >
                                Documentos Relacionados
                            </Button>
                        )}
                    </Card>
                    <Card
                        sx={{
                            padding: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                            marginTop: 5.5
                        }}
                    >

                        <Typography
                            variant="h6"
                            color="primary"
                            gutterBottom
                            sx={{ mt: 0 }}
                        >
                            Cómo Citar este Artículo
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                background: "#f5f5f5",
                                padding: 2,
                                borderRadius: 2,
                                fontFamily: "monospace",
                                color: "#344767",
                                wordWrap: "break-word",
                            }}
                        >
                            {`"${articulo.title_es}", ${articulo.creator || "Autor desconocido"}, ${articulo.publisher || "Publicación desconocida"
                                }, ${articulo.date || "Fecha no disponible"}.`}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ArticuloPage;
