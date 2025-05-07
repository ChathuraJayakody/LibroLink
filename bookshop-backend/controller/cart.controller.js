// This example assumes you have user authentication and a Cart model
const db = require('../models');
const Cart = db.Cart;
const CartItem = db.CartItem;
const Book = db.Book;

// Get user's cart (assume userId is from JWT/session)
exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Book] }]
    });
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }
    const items = cart.CartItems.map(item => ({
      bookId: item.bookId,
      title: item.Book.title,
      price: item.Book.price,
      quantity: item.quantity
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { bookId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    let item = await CartItem.findOne({ where: { cartId: cart.id, bookId } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.quantity = quantity;
    await item.save();
    res.json({ message: 'Quantity updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;
  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    await CartItem.destroy({ where: { cartId: cart.id, bookId } });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item' });
  }
};
