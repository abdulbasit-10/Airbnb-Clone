const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secret-key"; // move this to .env in production

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "Signup successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { signup, signin };