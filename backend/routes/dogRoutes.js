const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');

// POST - Criar cachorro
router.post('/', async (req, res) => {
  try {
    console.log('POST body:', req.body);
    
    const { age, name } = req.body;
    
    if (!age || !name) {
      return res.status(400).json({ error: 'Age e name são obrigatórios' });
    }

    const dog = new Dog({ age: Number(age), name });
    const saved = await dog.save();
    
    console.log('Dog salvo:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST erro:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET - Listar todos
router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find().sort({ createdAt: -1 });
    console.log(dogs.length + ' dogs encontrados');
    res.json(dogs);
  } catch (err) {
    console.error('GET erro:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - Editar
router.put('/:id', async (req, res) => {
  try {
    const { age, name } = req.body;
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      { age: Number(age), name },
      { new: true }
    );
    
    if (!dog) {
      return res.status(404).json({ error: 'Dog não encontrado' });
    }
    
    res.json(dog);
  } catch (err) {
    console.error('PUT erro:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dog deletado' });
  } catch (err) {
    console.error('DELETE erro:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;