const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// CREATE
router.post('/', upload.single('image'), async (req, res) => {
  const dog = new Dog({
    name: req.body.name,
    image: req.file.filename
  });
  await dog.save();
  res.json(dog);
});

// READ ALL
router.get('/', async (req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(dog);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Dog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deletado' });
});

module.exports = router;