const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//testing page
//router.get("/test", (req, res) =>
// res.json({
//   msg: "User WOrks!"
// })
//);

//@route POST api/users/register
//@desc Register a user
//@access Public
router.post("/register", (req, res) => {
  //built in function of mongb findone
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          //avatar: avatar,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
        //for testing only
        //return res.status(200).json({
        // msg:'Sucess'
        // })
      }
    })
    .catch(err => console.log(err));
});

//@route POST api/users/login
//@desc Register a user/return JWT token
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //Find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          email: "User not found"
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
