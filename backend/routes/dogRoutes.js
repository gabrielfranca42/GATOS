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

/* =======================
   CREATE (com imagem)
======================= */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const dog = new Dog({
      name: req.body.name,
      image: req.file ? req.file.filename : null
    });

    await dog.save();
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   READ
======================= */
router.get('/', async (req, res) => {
  const dogs = await Dog.find();
  res.json(dogs);
});

/* =======================
   UPDATE (COM IMAGEM AGORA)
======================= */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   DELETE
======================= */
router.delete('/:id', async (req, res) => {
  await Dog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deletado' });
});

module.exports = router;