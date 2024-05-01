const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(401).json({ error: "User alredy exsits" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hasedPassword });
    await newUser.save();
    res.status(201).json({ message: "User Rigiste Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUser = await UserModel.findOne({ username });
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkUser || !checkPassword) {
      res.status(401).json({ error: "Invalid username password" });
    }
    const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_TOKEN);
    res.status(201).json({ message: "User login Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { userRegister, login };
