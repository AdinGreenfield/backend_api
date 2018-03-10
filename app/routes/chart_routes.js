var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    //read chart
    app.get('/charts', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('charts').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    //delete chart
    app.delete('/charts/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('charts').removeOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    //update chart
    app.put('/charts/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const chart = { text: req.body.body, title: req.body.title };
        db.collection('charts').updateOne(details, chart, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    //insert chart
    app.post('/charts', function (req, res) {
        // You'll create your note here.
        //console.log(req.body)
        //res.send('Hello')
        const chart = {userName: req.body.title, chartName: req.body.body};
        db.collection('charts').insertOne(chart, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
}