const express = require('express');
const router = express.Router();// just router of express
const User = require('../../models/User');

//@route POST api/users/register
//@desc register a user
//@access Public

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        })
      }
      else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        //return res.status(200).json({ //just for testing purpose
        //msg: 'sucess'
        })
      }

    })
    .catch(err => console.log(err)); //promise
})

//router.get('/test',(req, res)=> res.json({
 // msg: 'Users works!'
//}));
module.exports = router;
