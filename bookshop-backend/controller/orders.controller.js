const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const Book = db.Book;

// GET /api/orders/history
exports.getOrderHistory = async (req, res) => {
  const userId = req.user.id; // Set by authJwt middleware
  try {
    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          include: [Book]
        }
      ]
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      total: order.total,
      items: order.OrderItems.map(item => ({
        title: item.Book.title,
        quantity: item.quantity,
        price: item.price
      }))
    }));

    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load order history', error: err.message });
  }
};

