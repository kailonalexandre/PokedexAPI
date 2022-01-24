const Usuario = require("../models/Usuario");

const criarUsuario = (req, res) => {
  const novoUsuario = new Usuario(req.body);

  novoUsuario
    .save()
    .then((usuario) => {
      return res.status(200).json({
        salvo: true,
        usuario: usuario,
        mensagem: "Usuario criado com sucesso!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        mensagem: "Usuario não foi criado!",
      });
    });
};

const buscarTodosUsuarios = async (req, res) => {
  Usuario.find({}, (err, usuarios) => {
    if (err) {
      return res.status(400).json({ sucesso: false, error: err });
    }

    return res.status(200).json({ sucesso: true, usuarios: usuarios });
  }).catch((err) => console.log(err));
};

const editarUsuario = async (req, res) => {
  Usuario.findOneAndUpdate({ _id: req.params.id }, req.body, (err, usuario) => {
    if (err) {
      return res.status(400).json({
        sucesso: false,
        error: err,
      });
    }

    if (!usuario) {
      return res
        .status(404)
        .json({ sucesso: false, error: `Usuario não encontrado` });
    }

    return res.status(200).json({
      sucesso: true,
      id: usuario._id,
      message: "Usuario editado!",
    });
  });
};

const deletarUsuario = async (req, res) => {
  Usuario.findOneAndDelete({ _id: req.params.id }, (err, usuario) => {
    if (err) {
      return res.status(400).json({
        sucesso: false,
        error: err,
      });
    }

    if (!usuario) {
      return res
        .status(404)
        .json({ sucesso: false, error: `Usuario não encontrado` });
    }

    return res.status(200).json({
      sucesso: true,
      id: usuario._id,
      message: "Usuario deletado!",
    });
  });
};

module.exports = {
  criarUsuario,
  buscarTodosUsuarios,
  editarUsuario,
  deletarUsuario,
};
