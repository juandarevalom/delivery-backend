const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const ubicacionesPath = path.join(__dirname, '../data/locations.json');

router.post('/', async (req, res) => {
  const { id, lat, lng, timestamp } = req.body;

  if (!id || !lat || !lng) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  let data = {};
  if (await fs.pathExists(ubicacionesPath)) {
    data = await fs.readJson(ubicacionesPath);
  }

  data[id] = { lat, lng, timestamp };
  await fs.writeJson(ubicacionesPath, data, { spaces: 2 });

  res.json({ message: 'Ubicación registrada' });
});

router.get('/', async (req, res) => {
  if (await fs.pathExists(ubicacionesPath)) {
    const data = await fs.readJson(ubicacionesPath);
    res.json(data);
  } else {
    res.json({});
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await fs.readJson(ubicacionesPath);
  res.json(data[id] || {});
});

module.exports = router;
