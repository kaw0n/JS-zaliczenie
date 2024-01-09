// authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extract the token from the request cookies
  const token = req.cookies.authToken;

  // Check if the token is present
  if (!token) {
    res.redirect('/error');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Attach the decoded user information to the request for future use
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    res.redirect('/error');
  }
};

