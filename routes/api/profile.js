const express = require('express');
const router = express.Router();// just router of express
router.get('/test',(req, res) => res.json({
  msg: 'Profile works!'
}));
module.exports = router;
