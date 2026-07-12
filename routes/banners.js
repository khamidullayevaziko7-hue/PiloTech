const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const adminAuth = require('../middleware/adminAuth');

// GET /api/banners — barcha banner slaydlari (ochiq, do'kon sahifasi uchun)
router.get('/', async (req, res) => {
  try{
    const banners = await Banner.find().sort({ order: 1, createdAt: 1 });
    res.json(banners);
  }catch(err){
    res.status(500).json({ error: 'Bannerlarni olishda xatolik' });
  }
});

// POST /api/banners — yangi banner qo'shish (admin)
router.post('/', adminAuth, async (req, res) => {
  try{
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json(banner);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/banners/:id — banner o'chirish (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try{
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: "Banner o'chirildi" });
  }catch(err){
    res.status(500).json({ error: "O'chirishda xatolik" });
  }
});

module.exports = router;
