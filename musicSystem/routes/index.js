var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { //here home page should come for our project
  res.render('index', { title: 'OMS Music System' });
});


module.exports = router;
