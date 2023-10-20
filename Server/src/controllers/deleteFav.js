const { Favorite } = require('../DB_connection');

const deleteFav = (req, res) => {
  const { id } = req.params;

  Favorite.destroy({
    where: { id }
  })
    .then(() => {
      Favorite.findAll().then(favorites => {
        return res.json({ favorites });
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: error.message });
    });
};

module.exports = deleteFav;
