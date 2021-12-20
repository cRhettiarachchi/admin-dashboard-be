const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProperty = {
  body: Joi.object().keys({
    property_name: Joi.string().required(),
    property_type: Joi.string().required().valid('Flat', 'HMO', 'Cottage', 'House', 'Rooms'),
    no_of_rooms: Joi.number().required(),
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string().allow(''),
    town: Joi.string().required(),
    region: Joi.string().required(),
    country: Joi.string().required(),
    post_code: Joi.string().required(),
    notes: Joi.string().allow('', null),
  }),
};

const updateProperty = {
  params: Joi.object().keys({
    propertyId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    property_name: Joi.string(),
    property_type: Joi.string().required().valid('Flat', 'HMO', 'Cottage', 'House', 'Rooms'),
    no_of_rooms: Joi.number().required(),
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string().allow(''),
    town: Joi.string().required(),
    region: Joi.string().required(),
    country: Joi.string().required(),
    post_code: Joi.string().required(),
    notes: Joi.string().allow('', null),
  }),
};

const getProperties = {
  query: Joi.object().keys({
    address: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const searchProperties = {
  query: Joi.object().keys({
    term: Joi.string().lowercase().allow(''),
  }),
};

const deleteProperty = {
  params: Joi.object().keys({
    propertyId: Joi.string().custom(objectId),
  }),
};

const getPropertyById = {
  params: Joi.object().keys({
    propertyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProperty,
  getProperties,
  searchProperties,
  deleteProperty,
  getPropertyById,
  updateProperty,
};
