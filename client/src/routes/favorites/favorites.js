import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

export const getFavorites = async () => {
  try {
    const token = localStorage.getItem("sessionToken"); // Cambiado a sessionToken

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${BASE_URL}/favorites/getFavorites`, {
      headers: {
        sessiontoken: token, // El backend espera sessiontoken
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error in getFavorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const toggleFavorite = async (characterId) => {
  try {
    const token = localStorage.getItem("sessionToken"); // Cambiado a sessionToken
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.post(
      `${BASE_URL}/favorites/`,
      { characterId },
      {
        headers: {
          sessiontoken: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in toggleFavorite:",
      error.response?.data || error.message
    );
    throw error;
  }
};
