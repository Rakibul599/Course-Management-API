const Token = require('../utils/Token');


async function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  console.log(token)
  if (!token ) {
    return res.status(401).json({ message: 'No token provided' });
  }
 
  try {
    const payload = Token.verifyAccessToken(token);
    req.user = { id: payload.userid,name:payload.name,email:payload.email, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireRole(role) {

  return (req, res, next) => {
    
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

module.exports = { requireAuth, requireRole };
