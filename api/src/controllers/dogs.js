const API_KEY = process.env;
const axios = require("axios");

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

const totalBarks = async (req, res) => {
  const name = req.query.name;
  const apiDogs = await getApiDogs();

  try {
    let dbData = await Breed.findAll();
    // console.log("DATA EN LA BD: " + dbData);
    if (!dbData.length) await Breed.bulkCreate(apiDogs);
    // console.log("DATA EN LA BD DESPUES DEL BULK: " + dbData);
  } catch (error) {
    console.log("ESTE ES EL CATCH DEL /DOGS> BULKCREATE " + error);
  }

  // const dbDogs = await getDbDogs()
  let dogsTotal = await getAllDogs();
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
};

module.exports = { totalBarks, getAllDogs };
