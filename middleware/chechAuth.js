// authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the token from the request cookies
  const token = req.cookies.authToken;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing Token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Attach the decoded user information to the request for future use
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
};

module.exports = authMiddleware;
