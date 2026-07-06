import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import InputField from "../components/InputField";
import Button from "../components/Button";

import "./Register.css";

const Register = () => {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const validateForm = () => {

        if (username.trim().length < 3) {

            toast.error("Username must contain at least 3 characters.");

            return false;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            toast.error("Please enter a valid email.");

            return false;

        }

        if (password.length < 8) {

            toast.error("Password must contain at least 8 characters.");

            return false;

        }

        if (password !== confirmPassword) {

            toast.error("Passwords do not match.");

            return false;

        }

        return true;

    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {

            await register(

                username,

                email,

                password

            );

            toast.success("Registration Successful!");

            navigate("/dashboard");

        } catch (err: any) {

            toast.error(

                err?.response?.data?.detail ||

                "Unable to create account."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <div className="register-left">

                <div className="brand">

                    <h1>AI Bug Triage</h1>

                    <h2>System</h2>

                    <p>

                        Join the next-generation intelligent bug management platform powered by AI.

                    </p>

                    <div className="features">

                        <span>✓ AI Classification</span>

                        <span>✓ Duplicate Detection</span>

                        <span>✓ Team Recommendation</span>

                        <span>✓ Dashboard Analytics</span>

                    </div>

                </div>

            </div>

            <div className="register-right">

                <div className="register-card">

                    <h2>Create Account</h2>

                    <p>

                        Register to continue

                    </p>

                    <form onSubmit={handleSubmit}>

                        <InputField

                            label="Username"

                            placeholder="Enter username"

                            value={username}

                            onChange={setUsername}

                        />

                        <InputField

                            label="Email"

                            type="email"

                            placeholder="Enter email"

                            value={email}

                            onChange={setEmail}

                        />

                        <InputField

                            label="Password"

                            type="password"

                            placeholder="Enter password"

                            value={password}

                            onChange={setPassword}

                        />

                        <InputField

                            label="Confirm Password"

                            type="password"

                            placeholder="Confirm password"

                            value={confirmPassword}

                            onChange={setConfirmPassword}

                        />

                        <Button

                            title="Create Account"

                            loading={loading}

                            type="submit"

                        />

                    </form>

                    <div className="login-link">

                        Already have an account?

                        <Link to="/">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Register;