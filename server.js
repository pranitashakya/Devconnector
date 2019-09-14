const express = require("express"); //import
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require('./routes/api/posts');

const app = express(); //instance

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }
));
app.use(bodyParser.json());

//Db config
const db = require("./config/keys").mongoURI;
//connect to mongdb
mongoose
  .connect(db)
  .then(() => console.log("MongDB connected"))
  .catch(err => console.log(err));

//First route request req res response
app.get("/", (req, res) => res.send("hello world")); //nothing after slash
const port = 5400;
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.listen(port, () => console.log(`Server running on port ${port}`));
