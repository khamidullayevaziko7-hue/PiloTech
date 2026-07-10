const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET /api/comments/:productId — mahsulotga tegishli barcha izohlar
router.get('/:productId', async (req, res) => {
  try{
    const comments = await Comment.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(comments);
  }catch(err){
    res.status(500).json({ error: 'Izohlarni olishda xatolik' });
  }
});

// POST /api/comments — yangi izoh qoldirish (mijoz, ochiq — auth kerak emas)
router.post('/', async (req, res) => {
  try{
    const { productId, name, text } = req.body;
    if(!productId || !name || !text){
      return res.status(400).json({ error: "Ism va izoh matni to'ldirilishi shart" });
    }
    const comment = new Comment({ productId, name: name.trim(), text: text.trim() });
    await comment.save();
    res.status(201).json(comment);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/comments/:id — izohni o'chirish (admin)
const adminAuth = require('../middleware/adminAuth');
router.delete('/:id', adminAuth, async (req, res) => {
  try{
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Izoh o'chirildi" });
  }catch(err){
    res.status(500).json({ error: "O'chirishda xatolik" });
  }
});

module.exports = router;
