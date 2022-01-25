const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = new Schema({
  vida: { type: Number},
  ataque: { type: Number},
  defesa: { type: Number},
  ataqueEspecial: { type: Number},
  defesaEspecial: { type: Number},
  velocidade: { type: Number},
});


const Evolucoes = new Schema({
    idDaEvolucao: { type : String },
    grau : {type : Number}
});


const Pokemon = new Schema({
  nome: { type: String, required: true },
  numero: { type: Number, required: true },
  imagem : {type: String, required : true},
  categoria: { type: String },
  altura: { type: Number },
  peso: { type: Number },
  passiva: { type: String },
  fraqueza: [{type: String}],
  tipo: [{type: String}],
  status : Status,
  evolucoes: [Evolucoes]

});

module.exports = mongoose.model("pokemon", Pokemon);
