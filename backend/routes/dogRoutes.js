const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');

router.post('/', async (req, res) => {
  console.log('=== POST /dogs ===');
  console.log('body:', req.body);

  try {
    const dog = new Dog({
      age: req.body.age,
      name: req.body.name
    });

    const saved = await dog.save();
    console.log('saved:', saved);
    res.json(saved);
  } catch (err) {
    console.log('error POST:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  console.log('=== GET /dogs ===');
  try {
    const dogs = await Dog.find().sort({ createdAt: -1 });
    console.log('count:', dogs.length);
    res.json(dogs);
  } catch (err) {
    console.log('error GET:', err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log('=== PUT /dogs/:id ===');
  console.log('id:', req.params.id);
  console.log('body:', req.body);

  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      {
        age: req.body.age,
        name: req.body.name
      },
      { new: true }
    );

    console.log('updated:', dog);
    res.json(dog);
  } catch (err) {
    console.log('error PUT:', err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  console.log('=== DELETE /dogs/:id ===');
  console.log('id:', req.params.id);

  try {
    await Dog.findByIdAndDelete(req.params.id);
    console.log('deleted');
    res.json({ message: 'deleted' });
  } catch (err) {
    console.log('error DELETE:', err);
    res.status(500).json(err);
  }
});

module.exports = router;