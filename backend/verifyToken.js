const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  console.log(token);
  
  if (!token) {
    return res.status(401).json("you are not autherized!");
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
