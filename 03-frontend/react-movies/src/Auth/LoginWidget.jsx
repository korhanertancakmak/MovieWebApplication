import { useNavigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignInWidget from "./OktaSigninWidget";
import { useEffect } from "react";

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const navigate = useNavigate();

    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    }

    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            navigate('/', {replace: true});
        }
    }, [authState, navigate])

    if (!authState) {
        return (
            <div>Loading...</div>
        )
    }

    return (<OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />);
};

export default LoginWidget;