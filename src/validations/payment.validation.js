const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    payment_date: Joi.date().required(),
    payment_type: Joi.string().required().valid('cash', 'bank', 'card'),
    is_on_time: Joi.boolean().required(),
    user: Joi.objectId().required(),
    property: Joi.objectId().required(),
  }),
};

const getPayments = {
  query: Joi.object().keys({
    property: Joi.objectId().optional(),
    user: Joi.objectId().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createPayment,
  getPayments,
};
