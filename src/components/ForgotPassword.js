import React, { useState } from "react";
import { useNavigate } from "react-router";
import API_BASE_URL from "../config";

const ForgotPassword = ({ showAlert }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    // STEP 1: CHECK EMAIL
    const checkEmail = async () => {
        const res = await fetch(`${API_BASE_URL}/api/auth/forgot/check-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const json = await res.json();

        if (json.success) {
            showAlert("Email verified successfully", "success");
            setStep(2);
        } else {
            showAlert("User not found", "danger");
        }
    };

    // STEP 2: SEND OTP
    const sendOtp = async () => {
        const res = await fetch(`${API_BASE_URL}/api/auth/forgot/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const json = await res.json();

        if (json.success) {
            showAlert("OTP sent to your email", "success");
            setStep(3);
        } else {
            showAlert("Failed to send OTP", "danger");
        }
    };

    // STEP 3: VERIFY OTP
    const verifyOtp = async () => {
        const res = await fetch(`${API_BASE_URL}/api/auth/forgot/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp })
        });
        const json = await res.json();

        if (json.success) {
            showAlert("OTP verified", "success");
            setStep(4);
        } else {
            showAlert("Invalid or expired OTP", "danger");
        }
    };

    // STEP 4: RESET PASSWORD
    const resetPassword = async () => {
        if (password !== cpassword) {
            showAlert("Passwords do not match", "danger");
            return;
        }

        const res = await fetch(`${API_BASE_URL}/api/auth/forgot/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const json = await res.json();

        if (json.success) {
            showAlert("Password updated successfully", "success");
            navigate("/login");
        } else {
            showAlert("Failed to reset password", "danger");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Forgot Password</h3>

            {step === 1 && (
                <>
                    <input type="email" className="form-control my-2" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                    <button className="btn btn-primary" onClick={checkEmail}>Next</button>
                </>
            )}

            {step === 2 && (
                <>
                    <p>OTP will be sent to your registered email</p>
                    <button className="btn btn-primary" onClick={sendOtp}>Send OTP</button>
                </>
            )}

            {step === 3 && (
                <>
                    <input type="text" className="form-control my-2" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
                    <button className="btn btn-primary" onClick={verifyOtp}>Verify OTP</button>
                </>
            )}

            {step === 4 && (
                <>
                    <input type="password" className="form-control my-2" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" className="form-control my-2" placeholder="Confirm Password" onChange={(e) => setCpassword(e.target.value)} />
                    <button className="btn btn-success" onClick={resetPassword}>Reset Password</button>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
