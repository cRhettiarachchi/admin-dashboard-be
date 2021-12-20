const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    password: Joi.string()
      .trim()
      .custom(password)
      .when('role', { is: 'admin', then: Joi.string().required().custom(password) }),
    first_name: Joi.string().required().trim().lowercase(),
    middle_name: Joi.string().allow('', null).trim().lowercase(),
    last_name: Joi.string().trim().lowercase(),
    role: Joi.string().required().valid('user', 'admin'),
    email: Joi.string().email().when('role', { is: 'admin', then: Joi.string().email().required() }),
    rent: Joi.number().required(),
    payment_frequency: Joi.number().required(),
    phone: Joi.string(),
    payment_ETA: Joi.date(),
    in_arrears: Joi.bool(),
    property: Joi.objectId().required(),
    room_number: Joi.number(),
    notes: Joi.string().allow('', null).trim(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string().trim().lowercase(),
      middle_name: Joi.string().allow('', null).trim().lowercase(),
      last_name: Joi.string().trim().lowercase(),
      role: Joi.string().valid('user', 'admin'),
      email: Joi.string().email().when('role', { is: 'admin', then: Joi.string().email() }),
      rent: Joi.number(),
      payment_frequency: Joi.number(),
      phone: Joi.string(),
      payment_ETA: Joi.date(),
      in_arrears: Joi.bool(),
      property: Joi.objectId(),
      room_number: Joi.number(),
      notes: Joi.string().allow('', null).trim(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
