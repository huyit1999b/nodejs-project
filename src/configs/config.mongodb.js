const dev = {
  app: {
    port: process.env.DEV_APP_PORT,
  },
  mongodb: {
    conn: process.env.DEV_APP_MONGODB_CONN,
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT,
  },
  mongodb: {
    conn: process.env.PROD_APP_MONGODB_CONN,
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];
