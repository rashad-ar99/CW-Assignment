const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/:id", async (req, res) => {
	const user_id = req.params.id;

	try {
		// const user = await User.findOne({ _id: user_id });
		const user = await getUser(user_id);
		if (!user)
			return res.status(401).send({ message: error.details[0].message });
		res.status(200).send({
			message: "User found",
			user: { firstName: user.firstName, lastName: user.lastName },
		});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.patch("/:id", async (req, res) => {
	const user_id = req.params.id;
	const user_details = req.body;

	try {
		const user = await getUser(user_id);

		if (!user) return res.status(404).send({ message: "User not found" });

		if (user_details.firstName != null) {
			user.firstName = user_details.firstName;
		}

		if (user_details.lastName != null) {
			user.lastName = user_details.lastName;
		}

		const updatedUser = await user.save();

		res.status(200).send({
			message: "User updated",
		});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

async function getUser(id) {
	let user;
	try {
		user = await User.findById(id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	return user;
}

module.exports = router;
