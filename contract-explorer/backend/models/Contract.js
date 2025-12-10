const mongoose = require("mongoose");
const ContractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  contractType: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Contract", ContractSchema);
