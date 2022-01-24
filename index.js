const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");

const app = express();
const PORT = 8080;

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.PORTA_MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("Conectado com MongoDB"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(PORT, () => {
  console.log("Backend está rodando!");
});
