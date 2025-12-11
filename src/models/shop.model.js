'use strict';

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const shopSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 150 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    verifyd: { type: Boolean, default: false },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, shopSchema);
