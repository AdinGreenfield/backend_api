
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;
const db             = require('../backend_api/config/db');

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, function(err, database) {
    if (err) return console.log(err)

    // noinspection JSAnnotator
    const db = database.db("high_five")
    require('../backend_api/app/routes')(app, db);

    app.listen(port, function () {
        console.log('We are live on ' + port)
    });
})

