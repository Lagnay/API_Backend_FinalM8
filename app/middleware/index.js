const express = require("express");
const cors = require("cors");

const rutaUser = require("../routes/user.routes");
const rutaBootcamp = require("../routes/bootcamp.routes");
const auth = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rutaUser);

app.use("/api/bootcamp", rutaBootcamp);

app.get("/", auth, (req, res) => {
  res
    .status(200)
    .send("Ruta validada exitosamente, bienvenid@! /inicio con el Token JWT");
});

app.all("*", (req, res) => {
  res.status(404).send("Ruta desconocida.");
});
module.exports = app;
