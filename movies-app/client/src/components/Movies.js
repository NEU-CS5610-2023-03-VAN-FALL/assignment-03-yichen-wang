import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useLocation} from 'react-router-dom';
import {Pagination, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const criteria = searchParams.get('criteria');

    const fetchMovies = async (page) => {
        setLoading(true);
        const searchEndpoint = `${process.env.REACT_APP_API_URL}/movies/search?query=${encodeURIComponent(searchQuery)}&page=${page}`;
        const popularEndpoint = `${process.env.REACT_APP_API_URL}/movies/popular?page=${page}`;
        const url = searchQuery ? searchEndpoint : popularEndpoint;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
        }
    };

    const navigate = useNavigate();
    // Function to handle search
    const handleSearch = async () => {
        setCurrentPage(1); // Reset to the first page for new searches
        fetchMovies(1, searchQuery); // Fetch movies based on the search query
        navigate(`/search?criteria=${encodeURIComponent(searchQuery)}`); // Update the URL
    };

    useEffect(() => {
        fetchMovies(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchMovies(newPage);
    };

    const renderPagination = () => {
        let items = [];
        let leftLimit = Math.max(1, currentPage - 4);
        let rightLimit = Math.min(currentPage + 4, totalPages);

        if (currentPage < 3) {
            rightLimit = Math.min(5, totalPages);
        }
        if (currentPage > totalPages - 3) {
            leftLimit = Math.max(totalPages - 4, 1);
        }

        for (let number = leftLimit; number <= rightLimit; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }

        return items;
    };

    const renderMovies = () => {
        if (movies.length === 0) {
            return <p className="text-center text-white">No data found!</p>;
        }
        return movies.map((movie, index) => (
            <div className="col-md-4 col-lg-3 mb-3" key={index}>
                <Card className="h-100">
                    <Link to={`/details/${movie.id}`}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                  alt={movie.title}/>
                    </Link>
                    <Card.Body>
                        <Card.Title>
                            <Link to={`/details/${movie.id}`}>{movie.title}</Link>
                        </Card.Title>
                        <Card.Text>
                            {movie.overview.length > 150 ? movie.overview.substring(0, 150) + "..." : movie.overview}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        ));
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center text-white">Popular Movies</h1>

            <div className="row mb-4">
                <div className="col">
                    <div className="input-group" data-bs-theme="dark">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for movies"
                            aria-label="Search for movies"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{backgroundColor: "#343a40", border: "none"}}
                        />
                        <button className="btn btn-primary" type="button" onClick={handleSearch}
                                disabled={!searchQuery}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row" data-bs-theme="dark">
                    {renderMovies()}
                </div>
            )}

            <Pagination className="justify-content-center" data-bs-theme="dark">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}/>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>
                {renderPagination()}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)}
                                 disabled={currentPage === totalPages}/>
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}/>
            </Pagination>
        </div>
    );
};

export default Movies;
