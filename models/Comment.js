const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true, trim: true, maxlength: 60 },
  text: { type: String, required: true, trim: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});

commentSchema.index({ productId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
