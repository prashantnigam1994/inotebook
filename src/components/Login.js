import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import API_BASE_URL from "../config";

const Login = ({ showAlert }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        // API CALL
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        // eslint-disable-next-line
        const json = await response.json()
        if (json.success) {
            // redirect
            localStorage.setItem("token", json.authToken);
            navigate("/")
            showAlert("Logged in successfully", "success")
        } else {
            showAlert("Invalid Credentials", "danger")
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="exampleInputPassword1" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
