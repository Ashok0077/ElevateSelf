const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json("Unauthorized: Missing or invalid token");
  }
  
  // Extract token from Authorization header
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    // Attach user ID from token to request object
    req.userId = data._id;

    next();
  });
};

module.exports = verifyToken;
