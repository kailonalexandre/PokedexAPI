const express = require("express");
const router = express.Router();

const {
  criarPokemon,
  buscarTodosPokemons,
  editarPokemon,
  deletarPokemon,
  deletarTodosPokemons,
  criarVariosPokemons,
} = require("../controllers/pokemonCtrl");

router.post("/pokemon", criarPokemon);
router.post("/pokemon/varios", criarVariosPokemons);
router.get("/pokemon", buscarTodosPokemons);
router.put("/pokemon/:id", editarPokemon);
router.delete("/pokemon/:id", deletarPokemon);
router.delete("/pokemon/", deletarTodosPokemons);

const { getTodosPokemons } = require("../lib/getPokedex");

router.get("/pokedex", getTodosPokemons);

module.exports = router;
