import "../style/appLayout.css";

import {Outlet, Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

export default function AppLayout() {
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <div className="app">
            <div className="title">
                <h1>Movies APP</h1>
            </div>
            <div className="header">
                <nav className="menu">
                    <ul className="menu-list">
                        <li>
                            <Link to="/">Movies</Link>
                        </li>
                        {isAuthenticated && (
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <Link to="/debugger">Auth Debugger</Link>
                            </li>
                        )}
                        <li>
                            {isAuthenticated ? (
                                <button
                                    className="exit-button"
                                    onClick={() => logout({returnTo: window.location.origin})}
                                >
                                    Log Out
                                </button>
                            ) : (
                                <button
                                    className="login-button"
                                    onClick={() => loginWithRedirect()}
                                >
                                    Log In
                                </button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
}
