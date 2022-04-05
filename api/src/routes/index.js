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

const getApiDogs = async () => {
  const { data } = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiData = await data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      weight: e.weight.metric,
      height: e.height.metric,
      life_span: e.life_span,
      temperament: e.temperament,
      imgUrl: e.image.url,
      description: e.description,
    };
  });
  return apiData;
};

const getDbDogs = async () => {
  return await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
};

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allData = apiDogs.concat(dbDogs);
  return allData;
};

//                    /DOGS
//                      &
//                  /DOGS?name=

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  // const apiDogs = await getApiDogs();
  let dogsTotal = await getAllDogs();

  // try {
  //   let dbData = await Breed.findAll();
  //   // console.log("DATA EN LA BD: " + dbData);
  //   if (!dbData.length) await Breed.bulkCreate(apiDogs);
  //   // console.log("DATA EN LA BD DESPUES DEL BULK: " + dbData);
  // } catch (error) {
  //   console.log("ESTE ES EL CATCH DEL /DOGS> BULKCREATE " + error);
  // }

  // const dbDogs = await getDbDogs()
  if (name) {
    //try{
    let dogName = await dogsTotal.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
    //}
    // console.log(dogName)
    Object.keys(dogName).length
      ? res.status(200).json(dogName)
      : res.status(404).json({ msg: "No one barks with that name" });
  } else {
    res.status(200).json(dogsTotal);
  }
});

//                  /DOGS/:IDRAZA

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

//                    /TEMPERAMENT

router.get("/temperament", async (req, res) => {
  // const dogos = await getAllDogs();
  const apiDogs = await getApiDogs();
  let temperaments = apiDogs.map((d) => {
    if (d.temperament) return d.temperament;
    else return "No temperaments";
  });
  // let arr = Array.from(temperaments)
  temperaments = temperaments.join().split(",");
  temperaments = temperaments.map((t) => t.trim());
  temperaments = Array.from(new Set(temperaments)).sort();
  // console.log(temperaments)
  temperaments.forEach((t) => {
    Temperament.findOrCreate({
      where: { name: t },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.status(200).json(allTemperaments);
});

//                        /DOG

let id = 1000;
router.post("/dog", async (req, res) => {
  const { name, weight, height, life_span, temperament, imgUrl, createdInDb } =
    req.body;
  if (!name || !weight || !height) {
    return res.status(400).json({ msg: "Name, weight and height are needed" });
  }
  id++;
  let newDog = Breed.create({
    id,
    name,
    weight,
    height,
    life_span,
    imgUrl,
    createdInDb,
  });
  if (typeof temperament === "string") {
    temperament.trim();
    Temperament.findOrCreate({
      where: {
        name: temperament,
      },
    });
  }
  // let temperamentDb = await Temperament.findAll({
  //   where: { name: temperament },
  // });

  // newDog.addTemperament(temperamentDb);

  res.status(200).json({ msg: "Bark created sucesfully!" });
});

module.exports = router;
