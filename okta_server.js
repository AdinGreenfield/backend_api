const express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

module.exports = function OktaWebServer(sampleConfig, app) {

    const oidc = new ExpressOIDC(Object.assign({
        issuer: sampleConfig.oidc.issuer,
        client_id: sampleConfig.oidc.clientId,
        client_secret: sampleConfig.oidc.clientSecret,
        redirect_uri: sampleConfig.oidc.redirectUri,
        scope: sampleConfig.oidc.scope
    }));

    app.use(session({
        secret: 'this-should-be-very-random',
        resave: true,
        saveUninitialized: false
    }));

    const displayConfig = Object.assign(
        {},
        sampleConfig.oidc,
        {
            clientSecret: '****' + sampleConfig.oidc.clientSecret.substr(sampleConfig.oidc.clientSecret.length - 4, 4)
        }
    );

    app.locals.oidcConfig = displayConfig;

    app.use(oidc.router);

    oidc.on('ready', () => {
        app.listen(sampleConfig.port, () => console.log(`App started on port ${sampleConfig.port}`));
    });

    oidc.on('error', err => {
        // An error occurred while setting up OIDC
        throw err;
    });
}