const axios = require('axios');
const URL = "https://rickandmortyapi.com/api/character/";

async function getCharById(req, res) {
    try {
        const id = Number(req.params.id);
        const { data } = await axios(`${URL}${id}`);
        
        if (data) {
            const { name, gender, species, origin, image, status, episode } = data;
            const character = {
                id,
                name,
                gender,
                species,
                origin,
                image,
                status,
                episode
            };
            res.json(character);
        }
        else {
            res.status(404).json({ message: `No se encontró el personaje con el id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getCharById;
