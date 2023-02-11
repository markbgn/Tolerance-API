const express = require("express");
const holeController = require("../controllers/holeController");

const router = express.Router();

router.route("/:size").get(holeController.getCharacters);
router.route("/:size/:char").get(holeController.getGrades);
router.route("/:size/:char/:grade").get(holeController.getRange);

module.exports = router;
