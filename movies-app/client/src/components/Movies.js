import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/popular?page=${page}`);
            const data = await response.json();
            setMovies(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchMovies(newPage);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Popular Movies</h1>
            {loading ? (
                <p>Loading movies...</p>
            ) : (
                <div className="row">
                    {movies.map((movie, index) => (
                        <div className="col-md-3 mb-3" key={index}> {/* 将这里的 col-md-4 改为 col-md-3 */}
                            <div className="card">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Movies;
