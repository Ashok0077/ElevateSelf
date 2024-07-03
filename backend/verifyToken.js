const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  
  if (!token) {
    return res.status(401).json({message : "Can't able to get token, check if you are login or not ", token : token});
  }

  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userId = data._id;

    next();
  });
};

module.exports = verifyToken;
