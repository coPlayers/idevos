const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({

});

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

const Dev = mongoose.model('dev', DevSchema);

module.exports = Dev;
