const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});

const getPayments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['property', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const payment = await paymentService.queryProperties(filter, options);
  res.send(payment);
});

module.exports = {
  createPayment,
  getPayments,
};
