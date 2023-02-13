const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to mongoose estabilished."));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
