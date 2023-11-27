import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/details/${id}`);
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found.</p>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid rounded" alt={movie.title} />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{movie.title}</h1>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Production Countries:</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
                    <p><strong>Spoken Languages:</strong> {movie.spoken_languages.map(language => language.english_name).join(', ')}</p>
                    <p><strong>IMDb ID:</strong> <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">{movie.imdb_id}</a></p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
