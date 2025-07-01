const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const pedidosPath = path.join(__dirname, '../data/pedidos.json');

// Rutas anteriores...

// Crear nuevo pedido
router.post('/crear', async (req, res) => {
  const nuevoPedido = req.body;
  if (!nuevoPedido.id || !nuevoPedido.lat || !nuevoPedido.lng || !nuevoPedido.repartidorId) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  let pedidos = [];
  if (await fs.pathExists(pedidosPath)) {
    pedidos = await fs.readJson(pedidosPath);
  }

  pedidos.push(nuevoPedido);
  await fs.writeJson(pedidosPath, pedidos, { spaces: 2 });

  res.json({ message: 'Pedido creado correctamente' });
});

module.exports = router;
