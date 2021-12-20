const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Payment } = require('../models');

const createPayment = async (paymentBody) => {
  return Payment.create(paymentBody);
};

const queryProperties = async (filter, options) => {
  options.populate = 'property user';
  return await Payment.paginate(filter, options);
};

module.exports = {
  createPayment,
  queryProperties,
};
