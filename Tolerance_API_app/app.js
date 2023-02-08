const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const testData = JSON.parse(fs.readFileSync(`${__dirname}/hole_data.json`));

// Get the available characters for a specific size
const GetCharacters = (req, res) => {
  // converting searched size to double
  const size = req.params.size * 1;

  // looking up characters
  const availableCharsSet = new Set();

  // filling up the set with the characters of the available tolerances
  testData.map((tol) => {
    if (size >= tol.lower_bound && size < tol.upper_bound)
      availableCharsSet.add(tol.char);
  });

  // converting set to array
  const availableChars = Array.from(availableCharsSet);

  res.status(200).json(availableChars);
};

// Get the available grades for a specific size & character
const GetGrades = (req, res) => {
  // converting searched size to double
  const size = req.params.size * 1;
  const char = req.params.char;
  // looking up characters
  const availableGradeSet = new Set();

  testData.map((tol) => {
    if (size >= tol.lower_bound && size < tol.upper_bound && char === tol.char)
      availableGradeSet.add(tol.itval);
  });

  // converting set to array
  const availableGrades = Array.from(availableGradeSet);

  res.status(200).json(availableGrades);
};

const GetRange = (req, res) => {
  // converting searched size to double
  const size = req.params.size * 1;
  const char = req.params.char;
  const grade = req.params.grade * 1;
  console.log(size, char, grade);
  const tolerance = testData.find((tol) => {
    if (
      size >= tol.lower_bound &&
      size < tol.upper_bound &&
      char === tol.char &&
      grade === tol.itval
    )
      return tol;
  });

  res.status(200).json(tolerance);
};

app.get("/api/v1/characters/:size", GetCharacters);

app.get("/api/v1/grades/:size/:char", GetGrades);

app.get("/api/v1/range/:size/:char/:grade", GetRange);

module.exports = app;
