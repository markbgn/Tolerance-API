const fs = require("fs");
const express = require("express");
const holeRouter = require("./routes/holeRoutes");
const shaftRouter = require("./routes/shaftRoutes");

const app = express();

app.use(express.json());

// Routing
app.use("/api/v1/hole", holeRouter);
app.use("/api/v1/shaft", shaftRouter);

module.exports = app;
