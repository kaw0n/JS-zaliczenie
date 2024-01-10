const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")

const user_login_view =(req,res) =>{
  res.render('login');
}

const log_in_method = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).send('<script>alert("Invalid credentials"); window.location.href = "/login";</script>');
    }

    // Check if the password exists and is a string
    if (!user.password || typeof user.password !== 'string') {
      return res.status(400).send('<script>alert("Invalid credentials"); window.location.href = "/login";</script>');
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send('<script>alert("Invalid credentials"); window.location.href = "/login";</script>');
    }

    // If authentication succeeds, generate a token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true });

    // Return a JSON response with the token
    // res.status(200).json({ message: 'Login successful', token });
    res.redirect('/post');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create_user = async (req, res) => {
  try {
      const { email, password, confirmPassword } = req.body;

      // Check if the password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).send('<script>alert("Passwords does not match"); window.location.href = "/register/create";</script>');
      }

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('<script>alert("User with this email already exists"); window.location.href = "/register/create";</script>');
      }

      if (password.length < 8) {
        return res.status(400).send('<script>alert("Password should be at least 8 characters long"); window.location.href = "/register/create";</script>');
    }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user instance
      const newUser = new User({
          email,
          password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.redirect('/login');
  } catch (error) {
      console.error(error);
  }
};

  const logout = (req, res) => {
    // Clear the 'authToken' cookie
    res.clearCookie('authToken');
  
    // Redirect to the login page (you can customize the URL)
    res.redirect('/login');
  };
  
  const user_create_view =(req, res) => {
    res.render('register');
  };





module.exports = {
  user_create_view,
  create_user,
  user_login_view,
  log_in_method,
  logout
}