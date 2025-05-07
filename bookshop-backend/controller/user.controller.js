const db = require('../models');
const User = db.User;

// GET /api/user
exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'fullName', 'phone', 'address']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile', error: err.message });
  }
};

// PATCH /api/user
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { fullName, phone, address } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.fullName = fullName;
    user.phone = phone;
    user.address = address;
    await user.save();
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      address: user.address
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};
