const mongoose = require("mongoose");
const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true,
    unique: true
  },

  rank: {
    type: Number,
    default: 1
  },

  parent: {
    type: String,
    default: null
  },

  filters: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("Page", PageSchema);
