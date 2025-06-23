import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_SERVER_URL ||
  process.env.REACT_APP_SERVER_URL ||
  process.env.server_url ||
  "";

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/createUser`, userData);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: "Error de red o servidor" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, credentials);
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: "Error de red o servidor" };
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/getUserById/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/users/deleteUser/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/users/updateUser/${id}`,
      userData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/getAllUsers`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Aquí puedes agregar más funciones relacionadas a usuarios
