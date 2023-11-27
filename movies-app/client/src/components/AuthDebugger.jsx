import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import 'bootstrap/dist/css/bootstrap.min.css'; // Include this if Bootstrap is installed via npm

export default function AuthDebugger() {
    const { user } = useAuth0();
    const { accessToken } = useAuthToken();

    // Function to format the user object into key: value pairs
    const formatUserInfo = (userInfo) => {
        return Object.keys(userInfo).map(key => `${key}: ${userInfo[key]}`).join('\n');
    };

    return (
        <div className="container mt-4">
            <div className="card mb-3">
                <div className="card-header">Access Token</div>
                <div className="card-body">
                    <pre className="bg-light p-2 border">{JSON.stringify(accessToken, null, 2)}</pre>
                </div>
            </div>
            <div className="card">
                <div className="card-header">User Info</div>
                <div className="card-body">
                    <pre className="bg-light p-2 border">{formatUserInfo(user)}</pre>
                </div>
            </div>
        </div>
    );
}
