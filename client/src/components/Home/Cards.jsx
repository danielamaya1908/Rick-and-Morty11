import Card from "./Card.jsx";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { orderCards } from "../../redux/actions";
import styles from "../../css/Cards.module.css";
import { getAllCharacters } from "../../routes/characters/characters";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import WcIcon from "@mui/icons-material/Wc";
import SearchBar from "../SearchBar/SearchBar.jsx";

const DivCard = styled.div`
  /* display: flex;
align-items: center;
justify-content: space-evenly;
flex-wrap: wrap; */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  gap: 16px;
  margin-top: 50px;
  padding: 0 16px 50px 16px;
`;

const Section = styled.section`
  width: 100%;
`;

const Selectors = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 60px 0;
  padding: 20px 16px;
  background: #ededede0;
  gap: 32px;
`;

export default function Cards({ onClose, characters: propCharacters }) {
  const reduxCharacters = useSelector((state) => state.allCharacters);
  const [characters, setCharacters] = useState(
    propCharacters || reduxCharacters || []
  );
  const [loading, setLoading] = useState(
    !propCharacters && reduxCharacters.length === 0
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [order, setOrder] = useState("");
  const [gender, setGender] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (propCharacters) {
      setCharacters(propCharacters);
      setLoading(false);
      return;
    }
    if (reduxCharacters.length > 0) {
      setCharacters(reduxCharacters);
      setLoading(false);
      return;
    }
    async function fetchCharacters() {
      try {
        const data = await getAllCharacters();
        setCharacters(data.results || []);
        dispatch({ type: "SET_ALL_CHARACTERS", payload: data.results || [] });
      } catch (error) {
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, [propCharacters, reduxCharacters, dispatch]);

  function handleOrder(e) {
    setOrder(e.target.value);
    dispatch(orderCards(e.target.value));
    setPage(1);
  }

  function handleFilter(e) {
    setGender(e.target.value);
    setPage(1);
    if (e.target.value === "") {
      // Si no hay filtro, muestra todos
      if (!propCharacters) {
        setCharacters(reduxCharacters);
      } else {
        setCharacters(propCharacters);
      }
    } else {
      if (!propCharacters) {
        setCharacters(
          reduxCharacters.filter((char) => char.gender === e.target.value)
        );
      } else {
        setCharacters(
          propCharacters.filter((char) => char.gender === e.target.value)
        );
      }
    }
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Nuevo: función para aplicar filtros, orden y búsqueda
  function getFilteredAndOrdered(charactersList) {
    let filtered = charactersList;
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

  // Usar la función para obtener los personajes a mostrar
  const isFavoritesView = !!propCharacters;
  const baseList = isFavoritesView ? propCharacters : reduxCharacters;
  const filteredAndOrdered = getFilteredAndOrdered(baseList);
  const paginatedCharacters = filteredAndOrdered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <div id={styles.loadingBig}>
        <div id={styles.loading}></div>
      </div>
    );
  }

  // Mostrar paginado siempre en la página principal (cuando no hay propCharacters)
  if (!propCharacters) {
    return (
      <Section>
        <Selectors
          style={{
            background: "rgba(44,83,100,0.07)",
            borderRadius: "18px",
            boxShadow: "0 2px 12px 0 rgba(44,83,100,0.10)",
            marginBottom: "40px",
            padding: "28px 0",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Buscar personaje por nombre..."
          />
          {/* Filtro de Orden sin InputLabel */}
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
          {/* Filtro de Género sin InputLabel */}
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
        </Selectors>
        <DivCard>
          {paginatedCharacters.map((character) => (
            <Card key={character.id} character={character} onClose={onClose} />
          ))}
        </DivCard>
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredAndOrdered.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Section>
    );
  }

  // Para favoritos y otras vistas sin paginado
  if (propCharacters) {
    return (
      <div className={styles.bigContainer}>
        <DivCard>
          {characters.map((character) => (
            <Card key={character.id} character={character} onClose={onClose} />
          ))}
        </DivCard>
      </div>
    );
  }

  return null;
}
