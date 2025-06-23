import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "../../css/Detail.module.css";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getFavorites, toggleFavorite } from "../../routes/favorites/favorites";

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [loadingFav, setLoadingFav] = useState(false);
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/rickandmorty/character/${id}`)
      .then(({ data }) => {
        if (!data.name) {
          window.alert(`No se encontró el personaje con el id: ${id}`);
        } else setCharacter(data);
      });
    return () => setCharacter({});
  }, [id]);

  // El corazón se pinta rojo si el personaje está en myFavorites
  const isFav = myFavorites.some((fav) => fav.id === Number(id));

  async function handleFavorite(e) {
    e.stopPropagation();
    setLoadingFav(true);
    try {
      await toggleFavorite(Number(id));
      const { favorites } = await getFavorites();
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

  if (!character || !character.name) return null;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detaildata}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(30,30,30,0.45)",
            borderRadius: 4,
            boxShadow: 4,
            p: 4,
            minWidth: 320,
            maxWidth: 480,
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#fff",
                textShadow: "0 2px 8px #232526",
              }}
            >
              {character.name}
            </Typography>
            <IconButton
              onClick={handleFavorite}
              sx={{ ml: 2, bgcolor: "white", boxShadow: 2 }}
              disabled={loadingFav}
              aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {isFav ? (
                <FavoriteIcon sx={{ color: "#e53935", fontSize: 38 }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "#e53935", fontSize: 38 }} />
              )}
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ color: "#7ed6df", mb: 1 }}>
            {character.species} — {character.gender}
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff", mb: 1 }}>
            <b>Status:</b> {character.status}
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff", mb: 1 }}>
            <b>Origen:</b> {character.origin?.name || character.origin}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2, width: "100%", fontWeight: 700 }}
            onClick={() => window.history.back()}
          >
            VOLVER
          </Button>
        </Box>
      </div>
      <div className={styles.detailimg}>
        <img src={character.image} alt={character.name} />
      </div>
    </div>
  );
}
