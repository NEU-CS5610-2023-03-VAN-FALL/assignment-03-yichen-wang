import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav, Button } from 'react-bootstrap';

export default function AppLayout() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="app container">
            <Navbar bg="dark" variant="dark" expand="lg" data-bs-theme="dark">
                <Navbar.Brand as={Link} to="/">Movies App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Movies</Nav.Link>
                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/debugger">Auth Debugger</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <div className="d-flex">
                        {isAuthenticated ? (
                            <Button variant="outline-danger" onClick={() => logout({ returnTo: window.location.origin })}>
                                Log Out
                            </Button>
                        ) : (
                            <Button variant="outline-success" onClick={() => loginWithRedirect()}>
                                Log In
                            </Button>
                        )}
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <div className="content mt-4">
                <Outlet/>
            </div>
        </div>
    );
}
