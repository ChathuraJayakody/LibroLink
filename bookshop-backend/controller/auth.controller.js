const db = require('../models');
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '2h' }
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Check if user/email exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      // Hash password
      const hash = await bcrypt.hash(password, 10);
      // Create user
      const user = await User.create({
        username,
        email,
        password: hash
      });
      // Optionally generate JWT on registration
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '2h' }
      );
      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, username: user.username, email: user.email },
        token
      });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  };