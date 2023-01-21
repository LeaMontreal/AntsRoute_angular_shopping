export default {

    // issuer of tokens, use the URL when authorizing with Okta Authorization Server
    oidc: {
        clientId: '0oa65mh79g3Zjqwrg5d7',
        issuer: 'https://dev-19018177.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']
    }
}
