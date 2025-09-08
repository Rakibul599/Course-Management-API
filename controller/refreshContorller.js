const User =require('../model/People');
const {signAccessToken,signRefreshToken,verifyRefreshToken}=require('../utils/Token');
async function refresh(req, res, next) {
  const { refreshToken } = req.body;
  
  if (!refreshToken)
    return res.status(400).json({ message: "Refresh token required" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    
    const user = await User.findById(payload.userid);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const newAccess = signAccessToken({ userid: user._id,name:user.name,email:user.email,role: user.role });
    const newRefresh = signRefreshToken({ userid: user._id,name:user.name,email:user.email,role: user.role });
    user.refreshToken = newRefresh;
    await user.save();
    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}
module.exports={refresh}
