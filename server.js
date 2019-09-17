const express = require("express");
const mongoose = require("mongoose");
const app = express(); //instance of express

//DB config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

//first route
app.get("/", (req, res) => res.send("hello"));
const port = 5400;
app.listen(port, () => console.log(`Server running on port ${port}`));
