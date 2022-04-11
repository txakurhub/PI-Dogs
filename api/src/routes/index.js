const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Únicos Endpoints/Flags que pueden utilizar
// GET https://api.thedogapi.com/v1/breeds
// GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

const dogsRouter = require("./dogs");
const dogRouter = require("./dog");
const tempRouter = require("./temperament");

router.use("/dogs", dogsRouter);
router.use("/dog", dogRouter);
router.use("/temperament", tempRouter);

module.exports = router;
