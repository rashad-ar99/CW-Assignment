import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const url = process.env.REACT_APP_REGISTER_URL;
			const { data: res } = await axios.post(url, data);
			navigate("/login");
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="signup__Container">
			<div className="signup__FormContainer">
				<div className="signup__Left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="login__Button">
							Sign In
						</button>
					</Link>
				</div>
				<div className="signup__Right">
					<form className="form__Container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							value={data.firstName}
							onChange={handleChange}
							className="form__Input"
							required
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							value={data.lastName}
							onChange={handleChange}
							className="form__Input"
							required
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={data.email}
							onChange={handleChange}
							className="form__Input"
							required
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={handleChange}
							className="form__Input"
							required
						/>
						{error && <div className="error__Message">{error}</div>}
						<button type="submit" className="submit__Button">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
