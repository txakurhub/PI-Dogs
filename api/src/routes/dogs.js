const { Router } = require("express");
const router = Router();
const { Breed } = require("../db");
const getAllDogs = require("../controllers/controllers.js");

router.get("/", async (req, res) => {
  //----------- IF > SEARCH BY QUERY
  const { name } = req.query;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
    Object.keys(dogName).length
      ? res.status(200).json(dogName)
      : res.status(404).json({ msg: "No one barks with that name" });
    //--------------
  } else {
    res.status(200).json(dogsTotal);
  }
});
//------------------------------------------- get by id
router.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  const dogTotal = await getAllDogs();
  let dogId = await dogTotal.filter(
    (el) => parseInt(el.id) === parseInt(idRaza)
  );
  dogId.length
    ? res.status(200).send(dogId)
    : res.status(404).send({ info: "Bark not found" });
});
//----------------------------------------- put
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, weight, height, life_span, temperaments, imgUrl } = req.body;
  let dogEdit = await Breed.findOne({
    where: { id: id },
  });
  try {
    dogEdit.name = name;
    dogEdit.weight = weight;
    dogEdit.height = height;
    dogEdit.life_span = life_span;
    dogEdit.imgUrl = imgUrl;
    await dogEdit.save();
  } catch (err) {
    console.log("Catch en PUT: " + err);
  }
  res.status(200).send({ msg: "Bark updated" });
});
// -------------------------------------- delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  parseId = parseInt(id);
  await Breed.destroy({
    where: { id: id },
  });
  res.status(200).json({ msg: "Bark erased" });
});

module.exports = router;
