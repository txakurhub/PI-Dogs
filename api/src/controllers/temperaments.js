const axios = require("axios");


const barkTemp = async (req, res) => {
    // const dogos = await getAllDogs();
    const temperamentApi = (
      await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    ).data;
    let temperaments = temperamentApi.map((d) => d.temperament);
    // let arr = Array.from(temperaments)
    temperaments = temperaments.join().split(",");
    // console.log( typeof temperaments )
    temperaments = Array.from(new Set(temperaments)).sort();
    temperaments.forEach((t) => {
      Temperament.findOrCreate({
        where: { name: t },
      });
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments);
  }

  module.exports = barkTemp