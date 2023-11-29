const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const OTP = require("../models/otp");
const { config } = require("dotenv");
config();

const login = async (req, res) => {
  const data = req.body;

  const { email, password } = data;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter Your Email and Password" });
  }

  try {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(404).json({
        message: "The email or password is incorrect. Please try again!",
      });
    }

    //compare password user with hashpassword
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        message: "invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "treasure");

    res.setHeader("authorization", `Bearer ${token}`);

    res.status(200).json({
      status: "OK",
      message: "User Autenticate Successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  let data = req.body;

  const { username, fullname, email, no_hp, password, otp } = data;

  if (!username || !fullname || !email || !no_hp || !password || !otp) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  //hash password
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const hashPassword = bcrypt.hashSync(data.password, 10);
    data.password = hashPassword;
    const user = await User.create({
      username,
      fullname,
      email,
      no_hp,
      password,
    });

    res.status(201).json({
      status: "OK",
      message: "Account created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { login, register };
