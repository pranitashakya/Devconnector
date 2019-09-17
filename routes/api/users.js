const express = require("express");
const router = express.Router();
//testing page
//router.get("/test", (req, res) =>
 // res.json({
 //   msg: "User WOrks!"
 // })
//);
//@route GET api/users/register
//@desc Register a user
//@access Public
router.post('/register', (req, res) => {
  //built in function of mongb findone
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        })
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        //for testing only
        //return res.status(200).json({
         // msg:'Sucess'
        //})
      }
    })
      
    .catch(err => console.log(err));
 })
module.exports = router;
