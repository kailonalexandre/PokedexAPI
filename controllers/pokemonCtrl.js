const Pokemon = require("../models/pokemon");

const criarPokemon = (req, res) => {
  const novoPokemon = new Pokemon(req.body);

  novoPokemon
    .save()
    .then((pokemon) => {
      return res.status(200).json({
        salvo: true,
        pokemon: pokemon,
        mensagem: "Pokemon criado com sucesso!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        mensagem: "Pokemon não foi criado!",
      });
    });
};

const buscarTodosPokemons = async (req, res) => {
  Pokemon.find({}, (err, pokemons) => {
    if (err) {
      return res.status(400).json({ sucesso: false, error: err });
    }

    return res.status(200).json({ sucesso: true, pokemons: pokemons });
  }).catch((err) => console.log(err));
};

const editarPokemon = async (req, res) => {
  Pokemon.findOneAndUpdate({ _id: req.params.id }, req.body, (err, pokemon) => {
    if (err) {
      return res.status(400).json({
        sucesso: false,
        error: err,
      });
    }

    if (!pokemon) {
      return res
        .status(404)
        .json({ sucesso: false, error: `Pokemon não encontrado` });
    }

    return res.status(200).json({
      sucesso: true,
      id: pokemon._id,
      message: "Pokemon editado!",
    });
  });
};

const deletarPokemon = async (req, res) => {
  Pokemon.findOneAndDelete({ _id: req.params.id }, (err, pokemon) => {
    if (err) {
      return res.status(400).json({
        sucesso: false,
        error: err,
      });
    }

    if (!pokemon) {
      return res
        .status(404)
        .json({ sucesso: false, error: `Pokemon não encontrado` });
    }

    return res.status(200).json({
      sucesso: true,
      id: pokemon._id,
      message: "Pokemon deletado!",
    });
  });
};

module.exports = {
  criarPokemon,
  buscarTodosPokemons,
  editarPokemon,
  deletarPokemon,
};