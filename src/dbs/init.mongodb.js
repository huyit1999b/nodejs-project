'use strict';
const { default: mongoose, mongo } = require('mongoose');
const config = require('../configs/config.mongodb');

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(config.mongodb.conn, {
        maxPoolSize: 50,
      })
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB', err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
