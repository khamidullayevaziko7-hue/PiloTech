require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const statsRoutes = require('./routes/stats');
const commentRoutes = require('./routes/comments');
const bannerRoutes = require('./routes/banners');

const app = express();
app.use(cors());
app.use(express.json({ limit: '12mb' }));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/banners', bannerRoutes);

app.get('/', (req, res) => res.send('Do\'kon API ishlayapti'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB ulandi');
    app.listen(PORT, () => console.log(`Server ${PORT} portda ishga tushdi`));
  })
  .catch(err => console.error('MongoDB ulanish xatosi:', err));
