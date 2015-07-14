var db = require('../config.js');
var Path = require('../models/path.js');

var Paths = new db.Collection();

Paths.model = Path;

module.exports = Paths;
