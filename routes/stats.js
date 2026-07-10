const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');

// Xotirada saqlanadigan oddiy "kim faol" ro'yxati: { sessionId: oxirgi_korinish_vaqti }
// Eslatma: server qayta ishga tushsa (Render uxlab qolsa) bu ro'yxat tozalanadi — MVP uchun yetarli.
const activeSessions = new Map();
const ACTIVE_WINDOW_MS = 60 * 1000; // 60 soniya ichida ping yuborgan har kim "onlayn" hisoblanadi

// POST /api/stats/ping — do'kon sahifasidan har X soniyada yuboriladi (ochiq, auth kerak emas)
router.post('/ping', (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'sessionId kerak' });
  activeSessions.set(sessionId, Date.now());
  res.json({ ok: true });
});

// GET /api/stats/online — admin panel uchun, hozir nechta kishi faol ekanini qaytaradi
router.get('/online', adminAuth, (req, res) => {
  const now = Date.now();
  for (const [id, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > ACTIVE_WINDOW_MS) activeSessions.delete(id);
  }
  res.json({ online: activeSessions.size });
});

module.exports = router;
