const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
  nome: { type: String, required: true },
  dataDeNascimento: { type: Date },
  genero: { type: String },
  CPF: { type: String },
});

module.exports = mongoose.model("usuario", Usuario);
