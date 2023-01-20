require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const editRoutes = require("./routes/useredit");

//Database connection
connection();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/edit", editRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}.`);
});
