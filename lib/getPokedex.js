const axios = require("axios");

const apiPokedex = axios.create({
  baseURL: "https://www.pokemon.com/br/api/pokedex/kalos",
});

const apiNossa = axios.create({
  baseURL: "http://localhost:8080/pokemon/varios",
});

const getTodosPokemons = async (req, res) => {
  var pokedexFormatada = [];

  await apiPokedex
    .get("/")
    .then((response) => {
      pokedexFormatada = formatarResposta(response.data);
    })
    .catch((err) => {
      console.error(err);
    });

  await apiNossa.post("/", pokedexFormatada).then((response) => {
    console.log(response.data);
  });

  return res.status(200).json({
    mensagem: `Sucesso`,
  });
};

const formatarResposta = (resposta) => {
  const pokedex = resposta;
  const listaDePokemons = [];
  const tiposEn = [
    "grass",
    "poison",
    "fire",
    "flying",
    "dragon",
    "water",
    "bug",
    "normal",
    "dark",
    "electric",
    "psychic",
    "ice",
    "steel",
    "ground",
    "fairy",
    "fighting",
    "rock",
    "ghost",
  ];
  const tiposPt = [
    "Grama",
    "Veneno",
    "Fogo",
    "Voador",
    "Dragão",
    "Água",
    "Inseto",
    "Normal",
    "Sombrio",
    "Elétrico",
    "Psíquico",
    "Gelo",
    "Aço",
    "Terra",
    "Fada",
    "Lutador",
    "Pedra",
    "Fantasma",
  ];

  for (const pokemon of pokedex) {
    var pokemonAtual = {
      nome: pokemon.name,
      passiva: pokemon.abilities[0],
      peso: Math.floor(Math.random() * 1000),
      altura: Math.floor(Math.random() * 10),
      fraquesas: pokemon.weakness,
      imagem: pokemon.ThumbnailImage,
      numero: pokemon.id,
      tipo: [],
      status: {
        vida: Math.floor(Math.random() * 100),
        ataque: Math.floor(Math.random() * 100),
        defesa: Math.floor(Math.random() * 100),
        ataqueEspecial: Math.floor(Math.random() * 100),
        defesaEspecial: Math.floor(Math.random() * 100),
        velocidade: Math.floor(Math.random() * 100),
      },
    };

    pokemon.type.forEach((type) => {
      var contador = 0;
      tiposEn.forEach((tipo) => {
        type === tipo && pokemonAtual.tipo.push(tiposPt[contador]);
        contador++;
      });
    });

    listaDePokemons.push(pokemonAtual);
  }

  return listaDePokemons;
};

module.exports = {
  getTodosPokemons,
};
