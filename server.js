const app = require('./src/app');
const config = require('./src/configs/config.mongodb');
require('dotenv').config();

const PORT = config.app.port || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
  });
});
