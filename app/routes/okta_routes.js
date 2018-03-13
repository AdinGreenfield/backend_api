module.exports = function(app) {

    app.get('/', (req, res) => {

        if (req.userinfo) {
            res.send(`Hi ${req.userinfo.name}!`);
        } else {
            res.send('Hi!');
        }
    });

}
