import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavorites, toggleFavorite } from "../../routes/favorites/favorites";
import CardMui from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Card(props) {
  const { id, name, gender, image, species, status, origin } = props.character;
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  const [loadingFav, setLoadingFav] = React.useState(false);
  const navigate = useNavigate();

  async function handleFavorite(e) {
    e.stopPropagation();
    setLoadingFav(true);
    try {
      await toggleFavorite(id);
      // Siempre sincroniza favoritos con datos completos del backend
      const { favorites } = await getFavorites();
      // Normaliza los favoritos para que tengan 'id' en vez de 'character_id'
      const normalizedFavorites = favorites.map((fav) => ({
        ...fav,
        id: fav.character_id,
      }));
      dispatch({ type: "ADD_FAV", payload: normalizedFavorites });
    } catch (error) {
      // Puedes mostrar un mensaje de error si lo deseas
    } finally {
      setLoadingFav(false);
    }
  }

  function goToDetail() {
    navigate(`/detail/${id}`);
  }

  // El corazón se pinta rojo si el personaje está en myFavorites
  const isFav = myFavorites.some((fav) => fav.id === id);

  return (
    <CardMui
      sx={{
        maxWidth: 280,
        m: 2,
        position: "relative",
        borderRadius: 3,
        boxShadow: 3,
        cursor: "pointer",
      }}
      onClick={goToDetail}
    >
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <IconButton
        onClick={handleFavorite}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          bgcolor: "white",
          zIndex: 2,
        }}
        disabled={loadingFav}
        aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFav ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon color="error" />
        )}
      </IconButton>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          {name}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600 }}
            color="text.primary"
          >
            {gender}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600 }}
            color="text.primary"
          >
            {species}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, display: "inline" }}
            color="text.secondary"
          >
            Status:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, display: "inline", ml: 0.5 }}
            color="text.primary"
          >
            {status}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, display: "inline" }}
            color="text.secondary"
          >
            Origin:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, display: "inline", ml: 0.5 }}
            color="text.primary"
          >
            {origin?.name || origin}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            borderRadius: 2,
            width: "100%",
            fontWeight: 700,
          }}
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
        >
          VER DETALLES
        </Button>
      </CardContent>
    </CardMui>
  );
}
