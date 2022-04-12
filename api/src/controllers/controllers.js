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
   const dbData = await Breed.findAll({
    include: {
      model: Temperament,
      attributes:['name'],
  }});
  // console.log("----------------------" + await dbData.temperaments);
  const zzz = await dbData.map(d => {
    return {
      id: d.id,
      name: d.name,
      weight: d.weight,
      height: d.height,
      life_span: d.life_span,
      temperaments: d.temperaments.map( t => t.name), 
      imgUrl: d.imgUrl,
    }})
return zzz
};

//---------------------ALL DOGS
const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  console.log(dbDogs);
  const allData = apiDogs.concat(dbDogs);
  return allData;
};

module.exports = getAllDogs;
