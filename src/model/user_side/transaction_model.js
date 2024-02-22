const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: Number, // Assuming user_id is a number, adjust it based on your actual data type
    required: true,
  },
  entries: [
    {
      fromUserId: {
        type: Number,
        required: true,
      },
      toUserId: {
        type: Number,
        required: true,
      },
      oldBalance: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      updatedBalance: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
