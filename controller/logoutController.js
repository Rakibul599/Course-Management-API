const User = require("../model/People");
const { verifyRefreshToken } = require("../utils/Token");

// Logout function
const logout = async (req, res) => {
  // Extract refreshToken from request body
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ message: "Refresh token required" });

  try {
    // Verify the provided refresh token and extract payload
    const payload = verifyRefreshToken(refreshToken);
    // Find user in DB using userid from token payload
    const user = await User.findById(payload.userid);

    if (user) {
      // Remove stored refresh token from user document
      user.refreshToken = null;
      await user.save();
    }
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
module.exports = { logout };
