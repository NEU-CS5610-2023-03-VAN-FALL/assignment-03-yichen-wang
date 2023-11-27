import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Profile from './components/Profile';
import AuthenticationButton from './components/AuthenticationButton';

const App = () => {
    return (
        <Router>
            <div>
                <AuthenticationButton />
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
