import { useState, useEffect } from "react";
import { getFavorites } from "../../routes/favorites/favorites";
import Cards from "../Home/Cards.jsx";
import styles from "../../css/Favorites.module.css";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import SearchBar from "../SearchBar/SearchBar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import WcIcon from "@mui/icons-material/Wc";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");
  const [gender, setGender] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { success, favorites } = await getFavorites();
        if (success) {
          // Normaliza los favoritos para que tengan 'id' igual a 'character_id'
          const normalizedFavorites = favorites.map((fav) => ({
            ...fav,
            id: fav.character_id,
          }));
          setFavorites(normalizedFavorites);
        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Lógica de filtros y orden
  function getFilteredAndOrdered(favs) {
    let filtered = favs;
    if (searchTerm) {
      filtered = filtered.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (gender === "Male") {
      filtered = filtered.filter((char) => char.gender === "Male");
    } else if (gender === "Female") {
      filtered = filtered.filter((char) => char.gender === "Female");
    }
    if (order === "A") {
      filtered = [...filtered].sort((a, b) => a.id - b.id);
    } else if (order === "B") {
      filtered = [...filtered].sort((a, b) => b.id - a.id);
    }
    return filtered;
  }

  const filteredFavorites = getFilteredAndOrdered(favorites);
  const paginatedFavorites = filteredFavorites.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handlers para filtros
  function handleOrder(e) {
    setOrder(e.target.value);
    setPage(1);
  }
  function handleFilter(e) {
    setGender(e.target.value);
    setPage(1);
  }

  if (loading)
    return <div className={styles.bigContainer}>Loading favorites...</div>;
  if (error) return <div className={styles.bigContainer}>Error: {error}</div>;

  return (
    <div className={styles.bigContainer}>
      <Box mb={2} display="flex" justifyContent="center" alignItems="center">
        <div
          style={{
            display: "flex",
            gap: 24,
            background: "none", // Elimina fondo que genera efecto de doble input
            borderRadius: 0, // Sin bordes extra
            boxShadow: "none", // Sin sombra extra
            marginBottom: 24,
            padding: 0,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Buscar favorito por nombre..."
          />
          <FormControl
            sx={{
              minWidth: 200,
              bgcolor: "#f8fafc",
              borderRadius: 3,
              boxShadow: 1,
              mx: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#b0bec5" },
                "&:hover fieldset": { borderColor: "#0f2027" },
                "&.Mui-focused fieldset": { borderColor: "#0f2027" },
                fontSize: 18,
                paddingLeft: "12px",
                alignItems: "center",
                background: "#f8fafc",
              },
            }}
            size="medium"
          >
            <Select
              value={order}
              displayEmpty
              onChange={handleOrder}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: selected ? "#2c5364" : "#888",
                  }}
                >
                  <SortIcon sx={{ color: "#2c5364" }} />
                  <span style={{ fontWeight: 500 }}>
                    {selected === ""
                      ? "Orden"
                      : selected === "A"
                      ? "Ascendente"
                      : "Descendente"}
                  </span>
                </Box>
              )}
              sx={{
                fontWeight: 500,
                fontSize: 18,
                pl: 1,
                height: 48,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MenuItem value="A">Ascendente</MenuItem>
              <MenuItem value="B">Descendente</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              minWidth: 200,
              bgcolor: "#f8fafc",
              borderRadius: 3,
              boxShadow: 1,
              mx: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#b0bec5" },
                "&:hover fieldset": { borderColor: "#0f2027" },
                "&.Mui-focused fieldset": { borderColor: "#0f2027" },
                fontSize: 18,
                paddingLeft: "12px",
                alignItems: "center",
                background: "#f8fafc",
              },
            }}
            size="medium"
          >
            <Select
              value={gender}
              displayEmpty
              onChange={handleFilter}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: selected ? "#2c5364" : "#888",
                  }}
                >
                  <WcIcon sx={{ color: "#2c5364" }} />
                  <span style={{ fontWeight: 500 }}>
                    {selected === ""
                      ? "Género"
                      : selected === "Male"
                      ? "Masculino"
                      : "Femenino"}
                  </span>
                </Box>
              )}
              sx={{
                fontWeight: 500,
                fontSize: 18,
                pl: 1,
                height: 48,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Male">Masculino</MenuItem>
              <MenuItem value="Female">Femenino</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      {filteredFavorites.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
          fontSize={24}
          color="#888"
          fontWeight={500}
        >
          No tienes ningún favorito
        </Box>
      ) : (
        <>
          <Cards characters={paginatedFavorites} onClose={null} />
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(filteredFavorites.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </div>
  );
}
