const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

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
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
        //email: "Email already exists"
        //});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
// Hash password before saving in database
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
      }
    })
    .catch(err => console.log(err));
});

//@route POST api/users/login
//@desc Register a user/return JWT token
//@access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  //If valid input, use MongoDB’s User.findOne() to see if the user exists
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      //If user exists, use bcryptjs to compare submitted password with hashed password in our database
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            errors.password = "Password does not match.";
            return res.status(400).json(errors);
          }
          //If passwords match, create our JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              return res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//@route GET api/users/current (get me current user)
//@desc return current user
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    });
    // res.json({ msg: "Success" });
  }
);

module.exports = router;
