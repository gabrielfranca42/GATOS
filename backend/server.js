require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dogRoutes = require('./routes/dogRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// conexão MongoDB Atlas
const uri = process.env.MONGO_URI;

if (!uri) {
  console.log('MONGO_URI não encontrada no .env');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Atlas conectado');
  })
  .catch((err) => {
    console.log('Erro ao conectar no MongoDB:', err);
  });

// rotas
app.use('/dogs', dogRoutes);

// porta dinâmica (Render, Railway, etc)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});