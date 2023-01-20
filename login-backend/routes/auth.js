const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const enteredUser = req.body;
	const { error } = validate(enteredUser);

	try {
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: enteredUser.email });

		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			enteredUser.password,
			user.password
		);

		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		const user_id = user._id;
		res.status(200).send({ message: "Logged In Successfully", id: user_id });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = joi.object({
		email: joi.string().email().required().label("Email"),
		password: joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
