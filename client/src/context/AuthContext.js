import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("sessionToken"),
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: true,
  });

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("user");
    setAuth({
      token: null,
      user: null,
      isLoading: false,
    });
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("sessionToken");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        try {
          const response = await axios.get(
            "http://localhost:3001/rickandmorty/users/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.valid) {
            setAuth({
              token,
              user,
              isLoading: false,
            });
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      } else {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    };

    verifyAuth();
  }, [logout]);

  const login = useCallback(
    async (credentials) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/rickandmorty/users/login",
          credentials
        );

        if (response.data.success) {
          localStorage.setItem("sessionToken", response.data.sessionToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          setAuth({
            token: response.data.sessionToken,
            user: response.data.user,
            isLoading: false,
          });

          navigate("/home");
          return { success: true };
        }
        return {
          success: false,
          message: response.data.message || "Credenciales inválidas",
        };
      } catch (error) {
        console.error("Login error:", error);
        return {
          success: false,
          message: error.response?.data?.message || "Error de conexión",
        };
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (userData) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/rickandmorty/register",
          userData
        );

        if (response.data.sessionToken) {
          localStorage.setItem("sessionToken", response.data.sessionToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          setAuth({
            token: response.data.sessionToken,
            user: response.data.user,
            isLoading: false,
          });

          navigate("/home");
          return { success: true };
        }
        return { success: false, message: "Error en el registro" };
      } catch (error) {
        console.error("Registration error:", error);
        return {
          success: false,
          message: error.response?.data?.message || "Error de conexión",
        };
      }
    },
    [navigate]
  );

  const value = {
    auth,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!auth.isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export default AuthContext;
