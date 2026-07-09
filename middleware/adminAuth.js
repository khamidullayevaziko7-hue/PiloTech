// Oddiy admin himoyasi: .env dagi ADMIN_KEY bilan solishtiradi.
// Frontend admin panel har bir o'zgartiruvchi so'rovda "x-admin-key" header yuboradi.
module.exports = function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Ruxsat yo\'q — admin kalit noto\'g\'ri' });
  }
  next();
};
