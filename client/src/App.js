import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Cards from "./components/Home/Cards.jsx";
import Nav from "./components/Navbar/Nav.jsx";
import About from "./components/About/About.jsx";
import Detail from "./components/Home/Detail.jsx";
import Login from "./components/users/Login.jsx";
import CreateUser from "./components/users/CreateUser.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import { useDispatch } from "react-redux";
import { removeFav, removeAllFav } from "./redux/actions.js";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import VideoBackground from "./components/VideoBackground/VideoBackground";
import { getFavorites } from "./routes/favorites/favorites";

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Sincronizar favoritos al iniciar la app
  useEffect(() => {
    async function syncFavorites() {
      try {
        const { favorites } = await getFavorites();
        const normalizedFavorites = favorites.map((fav) => ({
          ...fav,
          id: fav.character_id,
        }));
        dispatch({ type: "ADD_FAV", payload: normalizedFavorites });
      } catch (err) {
        // Si no hay sesión, no hacer nada
      }
    }
    syncFavorites();
  }, [dispatch]);

  const onClose = (id) => {
    dispatch(removeFav(id));
  };

  const onCloseAll = () => {
    dispatch(removeAllFav());
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
          location.pathname !== "/register" && <Nav onCloseAll={onCloseAll} />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<CreateUser register={registerUser} />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Cards onClose={onClose} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
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
