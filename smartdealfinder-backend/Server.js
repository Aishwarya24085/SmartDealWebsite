const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const searchRoute = require("./routes/search");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", searchRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
