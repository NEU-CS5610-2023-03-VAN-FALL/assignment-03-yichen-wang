import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const {user} = useAuth0();

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <img src={user.picture} width="70" alt="profile avatar" className="rounded-circle me-3"/>
                        <h4 className="card-title mb-0">{user.name}</h4>
                    </div>
                    <p className="card-text mt-2">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className="card-text">
                        <strong>Auth0Id:</strong> {user.sub}
                    </p>
                    <p className="card-text">
                        <strong>Email Verified:</strong> {user.email_verified?.toString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default withAuthenticationRequired(Profile);