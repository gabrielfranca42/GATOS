const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('[MULTER] destination uploads/');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    console.log('[MULTER] filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  console.log('=== POST /dogs ===');
  console.log('content-type:', req.headers['content-type']);
  console.log('body:', req.body);
  console.log('file:', req.file);

  try {
    const dog = new Dog({
      name: req.body.name,
      image: req.file ? req.file.filename : null
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
    const dogs = await Dog.find();
    console.log('count:', dogs.length);

    res.json(dogs);
  } catch (err) {
    console.log('error GET:', err);
    res.status(500).json(err);
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  console.log('=== PUT /dogs/:id ===');
  console.log('id:', req.params.id);
  console.log('content-type:', req.headers['content-type']);
  console.log('body:', req.body);
  console.log('file:', req.file);

  try {
    const update = {
      name: req.body.name
    };

    if (req.file) {
      update.image = req.file.filename;
    }

    console.log('update:', update);

    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      update,
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