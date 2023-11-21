const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { config } = require("dotenv");
config();

const login = async(req, res) => {
    const data = req.body;

    const { email, password } = data;

    if (!email || !password) {
        return res.status(400).json({message: "masukan email dan password"});
    }

    try {
        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.json({ message: "email atau password salah. Silakan coba lagi! "});
        }

        if(user.password !== data.password) {
            return res.json({ message: "password salah"})
        }

        const token = jwt.sign({id: user._id, email: user.email}, "treasure")
        
        res.status(200).json({
            status: "OK",
            message: "User Autenticate Successfully",
            token,
        })
    } catch(error){
        res.status(404).json({
            status: "Error", 
            message: "User Not Found"
        });
    }
};

const register = async (req, res) => {
    let data = req.body;

    const { username, fullname, email, no_hp, password } = data;

    if (!username || !fullname || !email || !no_hp || !password) {
        return res.status(400).json({message: "semua field harus diisi"});
    }

    const user = await User.create(data)

    res.status(201).json({
      status: "OK",
      message: "Account created successfully",
      data: user
    });
};

module.exports = {login, register};

