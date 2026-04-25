require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dogRoutes = require('./routes/dogRoutes');

const app = express();

//  CORS e JSON
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//  Pasta uploads (caso tenha)
app.use('/uploads', express.static('uploads'));

//  MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB conectado'))
  .catch(err => console.log(' MongoDB erro:', err));

//  Rotas
app.use('/dogs', dogRoutes);

//  Teste básico
app.get('/', (req, res) => {
  res.json({ message: ' API Dogs funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor na porta ${PORT}`);
});