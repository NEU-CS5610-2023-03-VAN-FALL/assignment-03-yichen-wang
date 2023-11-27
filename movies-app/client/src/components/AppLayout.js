import {Outlet, Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AppLayout() {
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <div className="app container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Movies App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Movies</Link>
                            </li>
                            {isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/debugger">Auth Debugger</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className="d-flex">
                            {isAuthenticated ? (
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => logout({returnTo: window.location.origin})}
                                >
                                    Log Out
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => loginWithRedirect()}
                                >
                                    Log In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="content mt-4">
                <Outlet/>
            </div>
        </div>
    );
}
