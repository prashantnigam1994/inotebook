import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import API_BASE_URL from "../config";

const Signup = ({ showAlert }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (password !== cpassword) {
            showAlert("Passwords do not match", "danger");
            return;
        }
        // API CALL
        const response = await fetch(`${API_BASE_URL}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        // eslint-disable-next-line
        const json = await response.json()
        if (json.success) {
            // redirect
            localStorage.setItem("token", json.authToken);
            navigate("/")
            showAlert("Account created successfully", "success")
        } else {
            showAlert("Invalid Credentials", "danger")
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h3 className="my-4">Create an account to access iNotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" aria-describedby="emailHelp" name="name" minLength={3} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="exampleInputPassword1" name="password" minLength={5} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" name="cpassword" minLength={5} required onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
