const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const puntosPath = path.join(__dirname, '../data/puntos.json');

router.get('/', async (req, res) => {
  const data = await fs.readJson(puntosPath);
  res.json(data);
});

module.exports = router;
