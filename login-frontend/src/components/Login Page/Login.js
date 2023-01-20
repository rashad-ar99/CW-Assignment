import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const url = process.env.REACT_APP_LOGIN_URL;
			const { data: res } = await axios.post(url, data);

			localStorage.setItem("token", res.id);
			window.location = "/";
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="login__Container">
			<div className="login__FormContainer">
				<div className="login__Left">
					<form className="form__Container" onSubmit={handleSubmit}>
						<h1>Login To Your Account</h1>
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
							Sign In
						</button>
					</form>
				</div>
				<div className="login__Right">
					<h1>New Here?</h1>
					<Link to="/signup">
						<button type="button" className="signup__Button">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
