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
  let termoDeBusca = {};

  if (req.query.nome) {
    termoDeBusca = {
      nome: { $regex: req.query.nome, $options: "i" },
    };
  }

  await Pokemon.find(termoDeBusca)
    .then((pokemons) => {
      return res.status(200).json({ sucesso: true, pokemons: pokemons });
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({ sucesso: false, error: error });
      }
    });
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

const deletarTodosPokemons = async (req, res) => {
  Pokemon.deleteMany((err, pokemon) => {
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
const criarVariosPokemons = async (req, res) => {
  const listaDePokemons = req.body;
  var contador = 0;

  for (const pokemon of listaDePokemons) {
    await new Pokemon(pokemon)
      .save()
      .then(() => {
        contador++;
        console.log(`${pokemon.nome} foi cadastrado!`);
      })
      .catch((error) => {});
  }

  return res.status(200).json({
    sucesso: true,
    mensagem: `${contador} de ${listaDePokemons.length} foram cadastrados no banco!`,
  });
};

module.exports = {
  criarPokemon,
  buscarTodosPokemons,
  editarPokemon,
  deletarPokemon,
  deletarTodosPokemons,
  criarVariosPokemons,
};
