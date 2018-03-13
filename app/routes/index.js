var express = require('express');
var router = express.Router();

const chartRoutes = require('../routes/chart_routes');
const oktaRoutes = require('../routes/okta_routes');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//module.exports = function
module.exports = function(app, db){
    chartRoutes(app, db);
    oktaRoutes(app);
    // Other route groups could go here, in the future
};

// module.exports = router;
