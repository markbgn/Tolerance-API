const express = require("express");
const shaftController = require("../controllers/shaftController");

const router = express.Router();

router.route("/:size").get(shaftController.getCharacters);
router.route("/:size/:char").get(shaftController.getGrades);
router.route("/:size/:char/:grade").get(shaftController.getRange);

module.exports = router;
