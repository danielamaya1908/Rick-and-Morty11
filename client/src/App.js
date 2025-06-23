import "./App.css";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Cards from "./components/Cards.jsx";
import Nav from "./components/Nav.jsx";
import About from "./components/About.jsx";
import Detail from "./components/Detail.jsx";
import Login from "./components/users/Login.jsx";
import CreateUser from "./components/users/CreateUser.jsx";
import Favorites from "./components/Favorites.jsx";
import { useDispatch } from "react-redux";
import { removeFav, removeAllFav } from "./redux/actions.js";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import VideoBackground from "./VideoBackground";

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [character, setCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [copias, setCopias] = useState([]);

  const onClose = (id) => {
    const charactersFiltrados = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(charactersFiltrados);
    setCopias(copias.filter((charId) => charId !== id));
    dispatch(removeFav(id));
  };

  const onCloseAll = () => {
    setCharacters([]);
    setCopias([]);
    dispatch(removeAllFav());
  };

  const onSearch = async (id, string = "all") => {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );
      if (data) {
        if (string !== "all") {
          setCharacter(data);
        } else {
          if (!copias.includes(id)) {
            setCopias([...copias, id]);
            setCharacters([...characters, data]);
          } else alert("El personaje ya fue agregado");
        }
      } else window.alert(`No se encontró el personaje con el id: ${id}`);
    } catch (error) {
      window.alert(`No se encontró el personaje con el id: ${id}`);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/rickandmorty/users/createUser",
        userData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return { success: false, message: "Error de red o servidor" };
    }
  };

  return (
    <>
      <VideoBackground />
      <div className="App">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Nav onSearch={onSearch} onCloseAll={onCloseAll} />
          )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<CreateUser register={registerUser} />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/home"
              element={<Cards characters={characters} onClose={onClose} />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/detail/:id"
              element={<Detail character={character} onSearch={onSearch} />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
