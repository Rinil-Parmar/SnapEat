const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    table: {
      type: Number,
      required: true,
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "foods",
        required: true
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
