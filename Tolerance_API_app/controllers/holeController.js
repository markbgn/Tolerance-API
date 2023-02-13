const model = require("../models/toleranceModel");
const Hole = model.Hole;

// TODO: holeCOntroller and shaftController have the same functions with a different DataTransferItem. Functions could be defined in a separate File.
//Get the available characters for a specific size
exports.getCharacters = async (req, res) => {
  try {
    // converting searched size to double
    const size = req.params.size * 1;
    // looking up characters
    const availableCharsSet = new Set();

    //filling up the set with the characters of the available tolerances
    const tolerances = await Hole.find({
      lower_bound: { $lte: size },
      upper_bound: { $gt: size },
    });

    tolerances.map((tol) => availableCharsSet.add(tol.char));

    //converting set to array
    const availableChars = Array.from(availableCharsSet);

    res.status(200).json(availableChars);
  } catch (err) {
    console.log(err);
  }
};

// Get the available grades for a specific size & character
exports.getGrades = async (req, res) => {
  try {
    // converting searched size to double
    const size = req.params.size * 1;
    const char = req.params.char;

    // looking up characters
    const availableGradeSet = new Set();

    const tolerances = await Hole.find({
      char: char,
      lower_bound: { $lte: size },
      upper_bound: { $gt: size },
    });

    tolerances.map((tol) => availableGradeSet.add(tol.itval));

    // converting set to array
    const availableGrades = Array.from(availableGradeSet);

    res.status(200).json(availableGrades);
  } catch (err) {
    console.log(err);
  }
};

// Get the exact tolerance
exports.getRange = async (req, res) => {
  try {
    // converting searched size to double
    const size = req.params.size * 1;
    const char = req.params.char;
    const grade = req.params.grade * 1;

    const tolerance = await Hole.find({
      char: char,
      itval: grade,
      lower_bound: { $lte: size },
      upper_bound: { $gt: size },
    });

    res.status(200).json(tolerance);
  } catch (err) {
    console.log(err);
  }
};

// // OLD FUNCTIONALITY USING LOCAL FILES
// Get the available characters for a specific size
// exports.getCharacters = (req, res) => {
//   // converting searched size to double
//   const size = req.params.size * 1;

//   // looking up characters
//   const availableCharsSet = new Set();

//   // filling up the set with the characters of the available tolerances
//   holeData.map((tol) => {
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

//   holeData.map((tol) => {
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
//   const tolerance = holeData.find((tol) => {
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
