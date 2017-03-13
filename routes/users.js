// require loads the module called 'express.
var express = require('express');
var router = express.Router(); // middleware-between the raw and the final data.

/* GET users listing. */
router.get('/', function(req, res, next)
{
  res.send('respond with a resource');
});

module.exports = router; // exposing the router variable globally to be used into different files.
