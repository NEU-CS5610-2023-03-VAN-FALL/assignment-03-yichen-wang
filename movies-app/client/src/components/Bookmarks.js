import React, {useEffect, useState} from 'react';
import {useAuthToken} from "../AuthTokenContext";
import {useAuth0} from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const {accessToken} = useAuthToken();
    const {isAuthenticated} = useAuth0();

    const fetchBookmarks = async () => {
        if (!isAuthenticated) {
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/bookmarks`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBookmarks(data);
            } else {
                console.error('Error fetching bookmarks:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <div className="container mt-4">
            <h2>My Bookmarks</h2>
            <div className="row">
                {bookmarks.map((bookmark, index) => (
                    <div className="col-md-4 col-lg-3 mb-3" key={index}>
                        <Card className="h-100">
                            <Link to={`/details/${bookmark.id}`}>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${bookmark.poster_path}`}
                                          alt={bookmark.title}/>
                            </Link>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/details/${bookmark.id}`}>{bookmark.title}</Link>
                                </Card.Title>
                                <Card.Text>{bookmark.overview}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;