import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password });
            if (response.data.authenticated) {
                return navigate('/Main');
            } else {
                // Display error message from server or default message if no message provided
                setError(response.data.message || 'Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <center>
                            <div>
                                <h3 className="text-primary">Log in</h3>
                            </div>
                        </center>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="name" />
                                <label htmlFor="floatingText">Username</label>
                            </div>

                            <div className="form-floating mb-4">
                                <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Log in</button>
                        </form>
                        <p className="text-center mb-0">Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
