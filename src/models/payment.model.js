const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { paymentType } = require('../config/roles');

const paymentScheme = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Number,
      required: Date,
    },
    payment_type: {
      type: String,
      required: true,
      trim: true,
      enum: paymentType,
    },
    is_on_time: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
    },
  },
  { timeStamp: true }
);

// add plugin that converts mongoose to json
paymentScheme.plugin(toJSON);
paymentScheme.plugin(paginate);

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentScheme);

module.exports = Payment;
