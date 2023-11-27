import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AppLayout() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="app container"> {/* 添加 Bootstrap 容器类 */}
            <div className="title my-4">
                <h1>Movies APP</h1>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* 使用 Bootstrap 导航栏 */}
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Movies App</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
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
                            <li className="nav-item">
                                {isAuthenticated ? (
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => logout({ returnTo: window.location.origin })}
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
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content mt-4">
                <Outlet />
            </div>
        </div>
    );
}
