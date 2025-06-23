const axios = require("axios");

const getAllCharacters = async (req, res) => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character/"
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllCharacters;
