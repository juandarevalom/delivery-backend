const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/ubicacion', require('./routes/ubicaciones'));
app.use('/api/puntos', require('./routes/puntos'));
app.use('/api/pedidos', require('./routes/pedidos'));

app.get('/', (req, res) => {
  res.send('API de Delivery activa 🚴‍♂️');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
