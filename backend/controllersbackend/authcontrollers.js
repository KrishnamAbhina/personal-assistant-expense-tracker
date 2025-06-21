const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

// Login// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // ✅ Use `userId` in the token payload
    const token = jwt.sign(
  {
    id: user._id,
    name: user.name,     // ✅ include name
    email: user.email    // ✅ include email (optional)
  },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

    res.status(200).json({
  message: 'Login successful',
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
