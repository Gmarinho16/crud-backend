require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const clinicaRoutes = require("./routes/clinicaRoutes.js");

const app = express();
const PORT = process.env.PORT || 2024;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://gusmarinho:Marinho1603@cluster-bdnosql-gus.p7gzl.mongodb.net/"
  )
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use("/clinica", clinicaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  app.get("/", (req, res) => {
    res.send("Bem-vindo à API de Clínicas Médicas!");
  });
});
