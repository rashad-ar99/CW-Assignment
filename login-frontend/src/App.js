import Login from "./components/Login Page/Login";
import Main from "./components/Main/Main";
import SignUp from "./components/Register Page/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
	const user = localStorage.getItem("token");

	return (
		<div className="App">
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<SignUp />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/" exact element={<Navigate replace to="/login" />} />
			</Routes>
		</div>
	);
}

export default App;
