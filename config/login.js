module.exports = {
    "webServer": {
        "port": process.env.PORT || 8080,
        "oidc": {
            "clientId": "0oateuxvuiDpafd8K2p6",
            "clientSecret": "btrsG3nE0sVnavUbqWZJBY9mi7c5ZuesLLsM4dX-",
            "issuer": "https://xfields.okta.com",
            "redirectUri": "http://localhost:8000/authorization-code/callback",
            "scope": "openid profile email"
        },
    }
}



