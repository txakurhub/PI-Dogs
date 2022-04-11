const axios = require("axios");
const { Router } = require("express");
const { Breed, Temperament } = require("../db");
const API_KEY = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Únicos Endpoints/Flags que pueden utilizar
// GET https://api.thedogapi.com/v1/breeds
// GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

//------------------DOGS FROM API
const getApiDogs = async () => {
  const { data } = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiData = await data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      weight: e.weight.metric === "NaN" ? "0" : e.weight.metric,
      height: e.height.metric,
      life_span: e.life_span,
      temperaments: e.temperament ? e.temperament : "No temperaments",
      imgUrl: e.image.url,
      description: e.description,
    };
  });
  return apiData;
};

//---------------DOGS FROM DB
const getDbDogs = async () => {
  return await Breed.findAll({
    include: Temperament,
  });
};

//---------------------ALL DOGS
const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allData = apiDogs.concat(dbDogs);
  return allData;
};

///////////////    ROUTES     ///////////////////
//----------------------------------------------
//             /DOGS
//           /DOGS?name=
// ------------------------------------------ get

router.get("/dogs", async (req, res) => {
  //----------------- IF > SEARCH BY QUERY
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

//              /DOGS/:IDRAZA
// ---------------------------------------- get
router.get("/dogs/:idRaza", async (req, res) => {
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
router.put("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const { name, weight, height, life_span, temperaments, imgUrl } =
  req.body;
  let dogEdit = await Breed.findOne({
    where: { id: id },
  });
  try{
    dogEdit.name = name
    dogEdit.weight = weight
    dogEdit.height = height
    dogEdit.life_span = life_span
    dogEdit.imgUrl = imgUrl 
    await dogEdit.save();
  } catch (err) {
    console.log("Catch en PUT: " + err);
  }
  res.status(200).send({ msg: "Bark updated" });
});

// -------------------------------------- delete
router.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  parseId = parseInt(id);
  await Breed.destroy({
    where: { id: id },
  });
  res.status(200).json({ msg: "Bark erased" });
});

//                 /TEMPERAMENT
//------------------------------------------ get
router.get("/temperament", async (req, res) => {
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

//                       /DOG
//----------------------------------------- post
let id = 1000;
router.post("/dog", async (req, res) => {
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
//---------------------------------------------
module.exports = router;
