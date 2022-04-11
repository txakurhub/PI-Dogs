const { Router } = require("express");
const { Temperament } = require("../db");
const getAllDogs = require("../controllers/controllers.js");
const router = Router();

router.get("/", async (req, res) => {
  const allTempDogs = await getAllDogs();
  let temperaments = allTempDogs.map((d) => {
    if (d.temperaments) return d.temperaments;
    else return "No temperaments";
  });
  temperaments = temperaments.join().split(",");
  temperaments = temperaments.map((t) => t.trim());
  temperaments = Array.from(new Set(temperaments)).sort();
  temperaments.forEach((t) => {
    Temperament.findOrCreate({
      where: { name: t },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.status(200).json(allTemperaments);
});

module.exports = router;
