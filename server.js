// Este es uns ervidor que directamente arrancara la página de distribución
// Vomo no tenemos Babel lo hacemos de manera standard
const express = require('express');
const serveStatic = require('serve-static');
const { join } = require('path');
const history = require('connect-history-api-fallback');


const app = express();

// Directorio de configuración y le decimos que usa el modo historia
app.use('/', serveStatic(join(__dirname, '/dist')));
app.use(history());

// Rutas a procesar
app.get(/.*/, (req, res) => {
  res.sendFile(join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`⚑ Servidor para Vue.js listo ✓ -> http://localhost:${port}`);
