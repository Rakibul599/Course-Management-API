const User = require("../model/People");
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken } = require("../utils/Token");

// Login function
async function loginUser(req, res, next) {
  //Destructuring user info
  const { email, password } = req.body;

  try {
    // Find user by email in database
    let user = await User.findOne({ email });

    if (user) {
      // Compare provided password with hashed password stored in DB
      const isValidpassword = await bcrypt.compare(password, user.password);
      if (isValidpassword) {
        // Prepare user information payload for JWT
        let userInfo = {
          userid: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        // Generate access and refresh tokens
        const accessToken = signAccessToken(userInfo);
        const refreshToken = signRefreshToken(userInfo);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
          accessToken,
          refreshToken,
          data: {
            userid: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  loginUser,
};
