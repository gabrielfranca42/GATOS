require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dogRoutes = require('./routes/dogRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'API OK',
    mongo: mongoose.connection.readyState === 1 ? 'Conectado' : 'Erro'
  });
});

// Conecta na SUA database "gatos"
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
});

mongoose.connection.on('connected', () => console.log('MongoDB conectado'));
mongoose.connection.on('error', (err) => console.error('MongoDB erro:', err));

app.use('/dogs', dogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor porta ' + PORT));