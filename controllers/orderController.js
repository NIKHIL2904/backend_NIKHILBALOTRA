const Cart = require('../models/Cart');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Find all carts with "confirmed" status
    const orders = await Cart.find({ status: 'confirmed' }).populate({
      path: 'user',
      select: 'name email',
    });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
