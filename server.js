const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('../backend_api/config/db');
const oktaConfig = require('../backend_api/config/login');
const OktaWebServer = require('./okta_server');


app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, function(err, database) {
    if (err) return console.log(err)

    // noinspection JSAnnotator
    const db = database.db("high_five")
    require('../backend_api/app/routes')(app, db);

    new OktaWebServer(oktaConfig.webServer, app);

})

