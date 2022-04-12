const axios = require("axios");
const { Breed, Temperament } = require("../db");
const API_KEY = process.env;

//---------------DOGS FROM API
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

module.exports = getAllDogs;
