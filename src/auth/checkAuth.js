'use strict';
const ApiKeyService = require('../services/apikey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'Forbidden error',
        status: 'error',
      });
    }

    // check apiKey exists in db
    const objKey = await ApiKeyService.findById(key);
    if (!objKey) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'Forbidden error',
        status: 'error',
      });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'Permission denied',
        status: 'error',
      });
    }

    const validPermision = req.objKey.permissions.includes(permission);

    if (!validPermision) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'Permission denied',
        status: 'error',
      });
    }

    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  apiKey,
  permission,
  asyncHandler,
};
