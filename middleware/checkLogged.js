module.exports = (req, res, next) => {
    const token = req.cookies.authToken;
  // Check if the user is authenticated
  if (token) {
    return res.status(400).send('<script>alert("Jesteś już zalogowany"); window.location.href = "/account";</script>');
  }

  // If not authenticated, continue to the next middleware
  return next();
};