import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </button>
    ) : (
        <button onClick={loginWithRedirect}>Log In / Sign Up</button>
    );
};

export default AuthenticationButton;
