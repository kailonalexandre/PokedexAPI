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
      console.error("ops! ocorreu um erro" + err);
    });

  await apiNossa
    .post("/", pokedexFormatada)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });

  return res.status(200).json({
    mensagem: `Sucesso`,
  });
};

const formatarResposta = (resposta) => {
  const pokedex = resposta.slice(0, 10);
  const listaDePokemons = [];

  for (const pokemon of pokedex) {
    listaDePokemons.push({
      nome: pokemon.name,
      passiva: pokemon.abilities[0],
      peso: pokemon.weight,
      altura: pokemon.height,
      fraquesas: pokemon.weakness,
      imagem: pokemon.ThumbnailImage,
      numero: pokemon.id,
      tipo: pokemon.type,
    });
    return listaDePokemons;
  }

  // console.log(listaDePokemons);
};

module.exports = {
  getTodosPokemons,
};

// VERIFICAR OS TIPOS QUE NÃO TEM NA POKEDEX
// TRADUZIR DO INGLES PARA O PORTUGUES
