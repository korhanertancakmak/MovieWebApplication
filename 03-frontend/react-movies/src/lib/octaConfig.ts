import logo from '../Images/coreflix-logo.svg';

export const oktaConfig = {
    clientId: `${process.env.REACT_APP_OKTA_CLIENT_ID}`,
    issuer: `${process.env.REACT_APP_OKTA_ISSUER}`,
    redirectUri: `${process.env.REACT_APP_OKTA_REDIRECT_URI}`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    logo,
    features: {
        style: {
            logo: {
                maxWidth: '200px',
                height: 'auto',
            },
        },
        registration: true, 
        rememberMe: true,
        showPasswordToggleOnSignInPage: true,
    },
    colors: {
        brand: '#F00000', 
    },
}

