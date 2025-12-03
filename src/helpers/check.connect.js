'use strict';
const { default: mongoose } = require('mongoose');
const os = require('os');
const process = require('process');

const _SECONDS = 5000;

// Function to count active mongoose connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of mongoose connections: ${numConnections}`);
  return numConnections;
};

// Function to monitor and log if connections exceed a threshold
const checkOverload = () => {
  setInterval(() => {
    const numConnections = countConnect();
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // in MB
    const maxConnections = numCores * 4;

    console.log(`Number of CPU cores: ${numCores}`);
    console.log(`Memory Usage (RSS): ${memoryUsage.toFixed(2)} MB`);
    console.log(
      `number of connections: ${numConnections}, max allowed: ${maxConnections}`
    );

    if (numConnections > maxConnections) {
      console.warn('Warning: High number of mongoose connections detected!');
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
