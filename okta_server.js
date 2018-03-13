const express = require('express');
const session = require('express-session');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;

module.exports = function OktaWebServer(sampleConfig, app) {

    let oidc = new ExpressOIDC({
        issuer: sampleConfig.oidc.issuer,
        client_id: sampleConfig.oidc.clientId,
        client_secret: sampleConfig.oidc.clientSecret,
        redirect_uri: sampleConfig.oidc.redirectUri,
        routes: {
            callback: { defaultRedirect: "/" }
        },
        scope: sampleConfig.oidc.scope
    });

    app.use(session({
        secret: 'this-should-be-very-random',
        resave: true,
        saveUninitialized: false
    }));

    app.use(oidc.router);

    app.get('/', oidc.ensureAuthenticated(), (req, res) => {

        if (req.userinfo) {
            res.send(`Hi ${req.userinfo.name}!`);
            console.log(req.userinfo);
        } else {
            res.send('Hi!');
        }
    });

    oidc.on('ready', () => {
        app.listen(sampleConfig.port, () => console.log(`App started on port ${sampleConfig.port}`));
    });

    oidc.on('error', err => {
        // An error occurred while setting up OIDC
        throw err;
    });
};