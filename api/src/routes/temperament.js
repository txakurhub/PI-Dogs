const { Router } = require("express");
const { Temperament } = require("../db");
const getAllDogs = require("../controllers/controllers.js");
const router = Router();

router.get("/", async (req, res) => {
    const allTempDogs = await getAllDogs();
    let temperaments = allTempDogs.map((d) => {
      return d.temperaments ? d.temperaments : "No temperaments"
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
//   getAllDogs()
//     .then((dog) =>
//       dog.map((d) => {
//         return d.temperaments ? d.temperaments : "No temperaments";
//       }))
//     .then((temp) => temp.join().split(","))
//     .then((temp) => temp.map((t) => t.trim()))
//     .then((temp) => Array.from(new Set(temp)).sort())
//     .then((temp) => temp.forEach((t) => {
//         Temperament.findOrCreate({ where: { name: t } });
//       }))
//     .then((temp) => Temperament.findAll())
//     .then((temp) => res.status(200).json(temp));
// });

module.exports = router;
