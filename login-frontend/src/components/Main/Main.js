import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Main.css";

function Main() {
	const [userData, setUserData] = useState({
		firstName: "",
		lastName: "",
	});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setUserData({ ...userData, [input.name]: input.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const user_id = localStorage.getItem("token");
		try {
			const url = process.env.REACT_APP_EDITDATA_URL + "/" + user_id;
			const { data: res } = await axios.patch(url, userData);

			alert("Changes Saved.");
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	useEffect(() => {
		const user_id = localStorage.getItem("token");
		const getData = async () => {
			const url = process.env.REACT_APP_EDITDATA_URL + "/" + user_id;
			const { data: res_data } = await axios.get(url);
			console.log(res_data);
			setUserData({
				...userData,
				firstName: res_data.user.firstName,
				lastName: res_data.user.lastName,
			});
		};
		getData();
	}, []);

	return (
		<div className="main__Container">
			<nav className="navbar">
				<h1>MyPage</h1>
				<button className="logout__Button" onClick={handleLogout}>
					Log Out
				</button>
			</nav>
			<div className="user__Details">
				<form className="form__Container" onSubmit={handleSubmit}>
					<h1>Edit Details</h1>
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						value={userData.firstName}
						onChange={handleChange}
						className="form__Input"
						required
					/>
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						value={userData.lastName}
						onChange={handleChange}
						className="form__Input"
						required
					/>
					<button type="submit" className="submit__Button">
						Confirm Changes
					</button>
				</form>
			</div>
		</div>
	);
}

export default Main;
