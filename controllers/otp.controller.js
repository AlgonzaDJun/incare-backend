const otpGenerator = require("otp-generator");
const OTP = require("../models/otp");
const User = require("../models/user");

module.exports = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;
      const checkUserPresent = await User.findOne({ email });

      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User is already registered",
        });
      }
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      await OTP.create({ email, otp });
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};
