const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  size: String,
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  address: { type: String },
  telegramUserId: { type: String }, // Mini App orqali kelsa
  status: {
    type: String,
    enum: ['new', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
