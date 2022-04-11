const { Router } = require("express");
const { Breed, Temperament } = require("../db");
const router = Router();

let id = 1000;
router.post("/", async (req, res) => {
  const { name, weight, height, life_span, temperaments, imgUrl, createdInDb } =
    req.body;
  if (!name || !weight || !height) {
    return res.status(400).json({ msg: "Name, weight and height are needed" });
  }
  id++;
  const newDog = await Breed.create({
    id,
    name,
    weight,
    height,
    life_span,
    imgUrl,
    createdInDb,
  });
  for (let i = 0; i < temperaments.length; i++) {
    let temperamentDb = await Temperament.findOne({
      where: { name: temperaments[i] },
    });
    await newDog.addTemperament(temperamentDb);
  }
  res.status(200).json({ msg: "Bark created sucesfully!" });
});
module.exports = router;
