require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dogRoutes = require('./routes/dogRoutes');

const app = express();

// CORS para TODOS os origens (GitHub Pages incluso)
app.use(cors({
  origin: ['https://gabrielfranca42.github.io', 'http://localhost:3000', '*']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('MongoDB erro:', err));

app.use('/dogs', dogRoutes);

app.get('/', (req, res) => res.json({ message: 'API Dogs OK' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor porta', PORT));