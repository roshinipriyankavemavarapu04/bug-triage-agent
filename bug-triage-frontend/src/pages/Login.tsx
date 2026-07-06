import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import InputField from "../components/InputField";
import Button from "../components/Button";

import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const validateForm = () => {

        if (!email.trim()) {

            toast.error("Email is required.");

            return false;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            toast.error("Please enter a valid email.");

            return false;

        }

        if (!password.trim()) {

            toast.error("Password is required.");

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

            await login(
                email,
                password
            );

            toast.success("Welcome Back!");

            navigate("/dashboard");

        } catch (err: any) {

            toast.error(

                err?.response?.data?.detail ||

                "Invalid email or password."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-left">

                <div className="brand">

                    <h1>AI Bug Triage</h1>

                    <h2>System</h2>

                    <p>

                        Intelligent bug classification,
                        duplicate detection,
                        severity prediction,
                        priority recommendation,
                        and team assignment
                        powered by AI.

                    </p>

                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back</h2>

                    <p>

                        Login to continue

                    </p>

                    <form onSubmit={handleSubmit}>

                        <InputField

                            label="Email"

                            type="email"

                            placeholder="Enter your email"

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

                        <Button

                            title="Login"

                            loading={loading}

                            type="submit"

                        />

                    </form>

                    <div className="login-footer">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;