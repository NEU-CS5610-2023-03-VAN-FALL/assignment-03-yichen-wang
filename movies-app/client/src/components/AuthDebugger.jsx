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

    const darkModeStyles = {
        backgroundColor: '#343a40', // Dark background
        color: '#f8f9fa', // Light text
        borderColor: '#495057' // Dark border
    };

    return (
        <div className="container mt-4" style={{ backgroundColor: '#212529', color: 'white' }}>
            <div className="card mb-3" style={darkModeStyles}>
                <div className="card-header">Access Token</div>
                <div className="card-body">
                    <pre className="p-2" style={darkModeStyles}>{JSON.stringify(accessToken, null, 2)}</pre>
                </div>
            </div>
            <div className="card" style={darkModeStyles}>
                <div className="card-header">User Info</div>
                <div className="card-body">
                    <pre className="p-2" style={darkModeStyles}>{formatUserInfo(user)}</pre>
                </div>
            </div>
        </div>
    );
}
