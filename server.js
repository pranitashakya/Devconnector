const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");


const app = express(); //instance of express
//Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

//first route
app.get("/", (req, res) => res.send("hello"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 5400;
app.listen(port, () => console.log(`Server running on port ${port}`));
