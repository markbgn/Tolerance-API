const model = require("../models/toleranceModel");
const Shaft = model.Shaft;

// Get the available characters for a specific size
exports.getCharacters = async (req, res) => {
  // converting searched size to double
  const size = req.params.size * 1;

  // looking up characters
  const availableCharsSet = new Set();

  const tolerances = await Shaft.find({
    lower_bound: { $lte: size },
    upper_bound: { $gt: size },
  });

  // filling up the set with the characters of the available tolerances
  tolerances.map((tol) => availableCharsSet.add(tol.char));

  // converting set to array
  const availableChars = Array.from(availableCharsSet);

  res.status(200).json(availableChars);
};

// Get the available grades for a specific size & character
exports.getGrades = async (req, res) => {
  // converting searched size to double
  const size = req.params.size * 1;
  const char = req.params.char;
  // looking up characters
  const availableGradeSet = new Set();

  const tolerances = await Shaft.find({
    char: char,
    lower_bound: { $lte: size },
    upper_bound: { $gt: size },
  });

  tolerances.map((tol) => availableGradeSet.add(tol.itval));

  // converting set to array
  const availableGrades = Array.from(availableGradeSet);

  res.status(200).json(availableGrades);
};

// Get the exact tolerance
exports.getRange = async (req, res) => {
  // converting searched size to double
  const size = req.params.size * 1;
  const char = req.params.char;
  const grade = req.params.grade * 1;

  const tolerance = await Shaft.find({
    char: char,
    itval: grade,
    lower_bound: { $lte: size },
    upper_bound: { $gt: size },
  });

  res.status(200).json(tolerance);
};

// OLD FUNCTIONALITY
// const shaftData = JSON.parse(
//   fs.readFileSync(`${__dirname}/../shaft_data.json`)
// );

// // Get the available characters for a specific size
// exports.getCharacters = (req, res) => {
//   // converting searched size to double
//   const size = req.params.size * 1;

//   // looking up characters
//   const availableCharsSet = new Set();

//   // filling up the set with the characters of the available tolerances
//   shaftData.map((tol) => {
//     if (size >= tol.lower_bound && size < tol.upper_bound)
//       availableCharsSet.add(tol.char);
//   });

//   // converting set to array
//   const availableChars = Array.from(availableCharsSet);

//   res.status(200).json(availableChars);
// };

// // Get the available grades for a specific size & character
// exports.getGrades = (req, res) => {
//   // converting searched size to double
//   const size = req.params.size * 1;
//   const char = req.params.char;
//   // looking up characters
//   const availableGradeSet = new Set();

//   shaftData.map((tol) => {
//     if (size >= tol.lower_bound && size < tol.upper_bound && char === tol.char)
//       availableGradeSet.add(tol.itval);
//   });

//   // converting set to array
//   const availableGrades = Array.from(availableGradeSet);

//   res.status(200).json(availableGrades);
// };

// exports.getRange = (req, res) => {
//   // converting searched size to double
//   const size = req.params.size * 1;
//   const char = req.params.char;
//   const grade = req.params.grade * 1;
//   console.log(size, char, grade);
//   const tolerance = shaftData.find((tol) => {
//     if (
//       size >= tol.lower_bound &&
//       size < tol.upper_bound &&
//       char === tol.char &&
//       grade === tol.itval
//     )
//       return tol;
//   });

//   res.status(200).json(tolerance);
// };
