import React, {useState, useEffect} from 'react';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {Card, Form, Button, Modal} from 'react-bootstrap';
import {useAuthToken} from "../AuthTokenContext";

function Profile() {
    const {user} = useAuth0();
    const [name, setName] = useState(user.name);
    const [newName, setNewName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const {accessToken} = useAuthToken();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userData = await response.json();
            setName(userData.name);
        };
        fetchUserProfile();
    }, [accessToken]);

    const handleNameChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({name: newName}),
            });
            if (response.ok) {
                setName(newName);
                setShowModal(false);
            } else {
                console.error('Error updating name:', await response.text());
            }
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };

    return (
        <div className="container mt-4" data-bs-theme="dark">
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={user.picture} alt="User profile"/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {user.email}
                    </Card.Text>
                    <Card.Text>
                        <strong>Auth0Id:</strong> {user.sub}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email Verified:</strong> {user.email_verified?.toString()}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Change Name
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleNameChange}>
                        <Form.Group className="mb-3">
                            <Form.Label>New Name</Form.Label>
                            <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
                                          required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default withAuthenticationRequired(Profile);