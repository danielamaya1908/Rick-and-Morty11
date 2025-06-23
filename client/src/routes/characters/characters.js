// src/routes/characters/index.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "";

export const getCharacterById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/character/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllCharacters = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/character/`);
    return data;
  } catch (error) {
    throw error;
  }
};
