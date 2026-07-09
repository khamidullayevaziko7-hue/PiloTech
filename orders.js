const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders — yangi buyurtma yaratish
router.post('/', async (req, res) => {
  try {
    const { items, totalPrice, customerName, customerPhone, address, telegramUserId } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: "Savatingiz bo'sh" });
    }
    if (!customerName || !customerPhone) {
      return res.status(400).json({ error: 'Ism va telefon raqam kerak' });
    }

    const order = new Order({ items, totalPrice, customerName, customerPhone, address, telegramUserId });
    await order.save();

    // TODO: bu yerda Telegram bot orqali admin guruhga bildirishnoma yuborish kerak
    // Masalan: bot.sendMessage(ADMIN_CHAT_ID, `Yangi buyurtma: ${order._id}`)

    res.status(201).json({ message: 'Buyurtma qabul qilindi', orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: 'Buyurtmani yaratishda xatolik' });
  }
});

// GET /api/orders — barcha buyurtmalar ro'yxati (admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Buyurtmalarni olishda xatolik' });
  }
});

// PATCH /api/orders/:id — buyurtma statusini yangilash (admin)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Buyurtma topilmadi' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
