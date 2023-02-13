const dotenv = require("dotenv");
const mongoose = require("mongoose");

const toleranceSchema = new mongoose.Schema({
  char: {
    type: String,
    unique: false,
  },
  itval: {
    type: Number,
    unique: false,
  },
  lower_bound: {
    type: Number,
    unique: false,
  },
  upper_bound: {
    type: Number,
    unique: false,
  },
  upper_tol: {
    type: Number,
    unique: false,
  },
  lower_tol: {
    type: Number,
    unique: false,
  },
});

exports.Hole = mongoose.model("Hole", toleranceSchema, "hole_data"); // The "Hole" name prop refers to the name of the collection in MongoDB
exports.Shaft = mongoose.model("Shaft", toleranceSchema, "shaft_data");
