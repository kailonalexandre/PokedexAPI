const express = require("express");
const router = express.Router();

const {
  criarUsuario,
  buscarTodosUsuarios,
  editarUsuario,
  deletarUsuario,
} = require("../controllers/usuarioCtrl");

router.post("/usuario", criarUsuario);
router.get("/usuario", buscarTodosUsuarios);
router.put("/usuario/:id", editarUsuario);
router.delete("/usuario/:id", deletarUsuario);

module.exports = router;
