import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovies = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/popular?page=${page}`);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
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

    const renderPagination = () => {
        let items = [];
        let leftLimit = Math.max(1, currentPage - 4);
        let rightLimit = Math.min(currentPage + 4, totalPages);

        // 如果当前页码接近开始或结束，调整范围
        if (currentPage < 3) {
            rightLimit = 5;
        }
        if (currentPage > totalPages - 3) {
            leftLimit = totalPages - 4;
        }

        // 创建页码按钮
        for (let number = leftLimit; number <= rightLimit; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }

        return items;
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Popular Movies</h1>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {movies.map((movie, index) => (
                        <div className="col-md-4 col-lg-3 mb-3" key={index}>
                            <div className="card h-100">
                                <Link to={`/movies/${movie.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                                    </h5>
                                    <p className="card-text">{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {renderPagination()}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default Movies;
