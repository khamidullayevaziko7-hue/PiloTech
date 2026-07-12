const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true }, // base64 rasm
  tag: { type: String, default: '' },       // masalan "Yangi kelim"
  title: { type: String, default: '' },     // masalan "144Hz monitorlar"
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', bannerSchema);
