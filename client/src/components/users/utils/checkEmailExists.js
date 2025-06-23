import axios from "axios";

export async function checkEmailExists(email) {
  try {
    const response = await axios.get(
      `http://localhost:3001/rickandmorty/users/email/${encodeURIComponent(
        email
      )}`
    );
    return response.data.exists;
  } catch (error) {
    return false;
  }
}
