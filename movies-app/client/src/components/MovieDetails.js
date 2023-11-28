import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuthToken} from "../AuthTokenContext";
import {useAuth0} from "@auth0/auth0-react";

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: "5",
        content: ""
    });
    const {accessToken} = useAuthToken();
    const {isAuthenticated, loginWithRedirect} = useAuth0();
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
    const fetchReviews = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${id}`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
        fetchReviews();
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found.</p>;

    const handleReviewChange = (e) => {
        setNewReview({...newReview, [e.target.name]: e.target.value});
    };


    const submitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            await loginWithRedirect();
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(newReview)
                });

                if (response.ok) {
                    await fetchReviews();
                    setNewReview({
                        rating: "5",
                        content: ""
                    });
                } else {
                    console.error('Error submitting review:', await response.text());
                }
            } catch (error) {
                console.error('Error creating review:', error);
            }
        }
    };

    return (
        <div className="container mt-4" data-bs-theme="dark">
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid rounded"
                         alt={movie.title}/>
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{movie.title}</h1>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Production
                        Countries:</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
                    <p><strong>Spoken
                        Languages:</strong> {movie.spoken_languages.map(language => language.english_name).join(', ')}
                    </p>
                    <p><strong>IMDb ID:</strong> <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank"
                                                    rel="noopener noreferrer">{movie.imdb_id}</a></p>
                </div>
            </div>
            <div className="mt-4">
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="list-group">
                        {reviews.map(review => (
                            <div key={review.id} className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{review.user && review.user.name ? review.user.name : 'Anonymous'}</h5>
                                    <small>Rating: {review.rating}</small>
                                </div>
                                <p className="mb-1">{review.content}</p>
                            </div>
                        ))}
                    </div>
                ) : <p>No reviews yet.</p>}
            </div>
            <div className="mt-4">
                <h2>Submit a Review</h2>
                <form onSubmit={(e) => submitReview(e)}>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <select className="form-select" name="rating" value={newReview.rating}
                                onChange={handleReviewChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Review</label>
                        <textarea className="form-control" name="content" value={newReview.content}
                                  onChange={handleReviewChange} rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default MovieDetails;
