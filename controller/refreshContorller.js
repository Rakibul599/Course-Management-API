const User = require('../model/People');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/Token');

async function refresh(req, res, next) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const payload = await verifyRefreshToken(refreshToken); 
    console.log("Decoded payload:", payload);

    const user = await User.findById(payload.userid);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // console.log(user.refreshToken)
    // console.log(refreshToken)
    if (!user.refreshToken || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccess = signAccessToken({
      userid: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const newRefresh = signRefreshToken({
      userid: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    user.refreshToken = newRefresh;
    await user.save();

    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}

module.exports = { refresh };
