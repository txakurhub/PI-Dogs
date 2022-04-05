const getAllDogs = require("./dogs")

const barkId = async (req, res) => {
    const { idRaza } = req.params;
    const dogTotal = await getAllDogs();
    let dogId = await dogTotal.filter(
      (el) => parseInt(el.id) === parseInt(idRaza)
    );
    dogId.length
      ? res.status(200).send(dogId)
      : res.status(404).send({ info: "Bark not found" });
  }

  module.exports = barkId