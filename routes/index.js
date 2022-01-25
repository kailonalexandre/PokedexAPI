const express = require("express");
const router = express.Router();

const {
  criarPokemon,
  buscarTodosPokemons,
  editarPokemon,
  deletarPokemon,
} = require("../controllers/pokemonCtrl");

router.post("/pokemon", criarPokemon);
router.get("/pokemon", buscarTodosPokemons);
router.put("/pokemon/:id", editarPokemon);
router.delete("/pokemon/:id", deletarPokemon);

module.exports = router;
