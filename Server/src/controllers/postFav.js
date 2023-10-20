/* const { Favorite } = require('../DB_connection');

const postFav = (req, res) => {
  const { name, origin, status, image, species, gender } = req.body;

  if (!name || !origin || !status || !image || !species || !gender) {
    return res.status(401).json({ message: "Faltan datos" });
  }

  Favorite.findOrCreate({
    where: { name },
    defaults: { origin, status, image, species, gender }
  })
    .then(([character, created]) => {
      console.log(character);
      console.log(created); 
      Favorite.findAll().then(favorites => {
        return res.json({ favorites });
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: error.message });
    });
};

module.exports = postFav; */
const { Favorite } = require('../DB_connection');

const postFav = (req, res) => {
  const { name, status, image, species, gender } = req.body;
  const originName = req.body.origin.name;

/*   if (!name || !originName || !status || !image || !species || !gender) {
    return res.status(401).json({ message: "Faltan datos" });
  } */

  Favorite.findOrCreate({
    where: { name },
    defaults: { origin: originName, status, image, species, gender }
  })
    .then(([character, created]) => {
      console.log(character);
      console.log(created); 
      Favorite.findAll().then(favorites => {
        return res.json({ favorites });
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: error.message });
    });
};

module.exports = postFav;

