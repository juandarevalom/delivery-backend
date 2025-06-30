const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let ubicaciones = {}; // Objeto en memoria (podrías usar un JSON para simular persistencia)

// Ruta para recibir la ubicación
app.post('/api/ubicacion', (req, res) => {
  const { id, lat, lng, timestamp } = req.body;

  if (!id || !lat || !lng) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  ubicaciones[id] = { lat, lng, timestamp };
  fs.writeFileSync('locations.json', JSON.stringify(ubicaciones, null, 2));

  res.json({ message: 'Ubicación recibida' });
});

// Ruta para consultar ubicaciones actuales
app.get('/api/ubicaciones', (req, res) => {
  res.json(ubicaciones);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
