const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  coding: {
    type: Boolean,
    default: false
  },
});