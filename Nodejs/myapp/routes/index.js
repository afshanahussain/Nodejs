var express = require('express');
var router = express.Router();
var emp = require('../Employee.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',employees: emp });
});

module.exports = router;
