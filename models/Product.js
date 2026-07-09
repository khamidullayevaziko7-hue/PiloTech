const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  category: {
    type: String,
    required: true,
    enum: ['gaming', 'phone-accessory', 'clothing']
  },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0 }, // chegirma ko'rsatish uchun (ixtiyoriy)
  description: { type: String, default: '' },
  images: [{ type: String }], // rasm URL'lari
  stock: { type: Number, required: true, default: 0 },
  sizes: [{ type: String }], // kiyim uchun: ['S','M','L','XL'], boshqalari uchun bo'sh
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

productSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
