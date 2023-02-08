const express = require("express");

const app = express();
app.use(express.json());

const GetCharacters = (req, res) => {
  res.send("Characters for a specific size.");
};

const GetGrades = (req, res) => {
  res.send("Grades for a spesific size and character.");
};

const GetRange = (req, res) => {
  res.send("Ranges for a specific size, character and value.");
};

app.get("/api/v1/characters", GetCharacters);

app.get("/api/v1/grades", GetGrades);

app.get("/api/v1/range", GetRange);

module.exports = app;
