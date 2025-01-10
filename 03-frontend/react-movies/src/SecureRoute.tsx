import { useOktaAuth } from '@okta/okta-react';
import { Navigate, Outlet } from 'react-router-dom';

const SecureRoute = () => {
    const { authState } = useOktaAuth();

    if (!authState || authState.isPending) {
        return <div>Loading...</div>;
    }

    // Render the child components if the user is authenticated
    return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;
