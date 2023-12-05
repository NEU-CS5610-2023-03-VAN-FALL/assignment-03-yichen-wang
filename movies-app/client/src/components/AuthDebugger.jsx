import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {useAuthToken} from "../AuthTokenContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthDebugger() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    const {accessToken} = useAuthToken();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Function to format the user object into key: value pairs
    const formatUserInfo = (userInfo) => {
        return Object.keys(userInfo).map(key => `${key}: ${userInfo[key]}`).join('\n');
    };

    return (
        <div className="container mt-4">
            <div className="card mb-3">
                <div className="card-header">Access Token</div>
                <div className="card-body">
                    <pre className="p-2">{JSON.stringify(accessToken, null, 2)}</pre>
                </div>
            </div>
            <div className="card">
                <div className="card-header">User Info</div>
                <div className="card-body">
                    <pre className="p-2">{formatUserInfo(user)}</pre>
                </div>
            </div>
        </div>
    );
}

export default withAuthenticationRequired(AuthDebugger);