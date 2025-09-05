const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(401);

    const foundToken = await Token.findOne({ token });
    if (!foundToken) return res.sendStatus(401);

    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
