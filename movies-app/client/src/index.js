import React from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Movies from './components/Movies';
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import VerifyUser from "./components/VerifyUser";
import AuthDebugger from "./components/AuthDebugger";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import {AuthTokenProvider} from "./AuthTokenContext";
import "./style/normalize.css";
import "./style/index.css";
import MovieDetails from "./components/MovieDetails";

const container = document.getElementById("root");

const requestedScopes = ["profile", "email"];

function RequireAuth({children}) {
    const {isAuthenticated, isLoading} = useAuth0();

    // If the user is not authenticated, redirect to the home page
    if (!isLoading && !isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    // Otherwise, display the children (the protected page)
    return children;
}

const root = ReactDOMClient.createRoot(container);

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: `${window.location.origin}/verify-user`,
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: requestedScopes.join(" "),
            }}
        >
            <AuthTokenProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/verify-user" element={<VerifyUser/>}/>
                        <Route
                            path="/"
                            element={
                                <AppLayout/>
                            }
                        >
                            <Route index element={<Movies/>}/>
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="movies/:movieId" element={<MovieDetails/>}/>
                            <Route path="debugger" element={<AuthDebugger/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthTokenProvider>
        </Auth0Provider>
    </React.StrictMode>
);
