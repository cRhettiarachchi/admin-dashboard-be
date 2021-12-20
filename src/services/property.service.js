const httpStatus = require('http-status');
const { Property } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a property
 * @returns {Promise<Property>}
 * @param propertyBody
 */
const createProperty = async (propertyBody) => {
  if (propertyBody.property_name && (await Property.isPropertyNameTaken(propertyBody.property_name))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Property name already exists');
  }
  propertyBody.property_name_lower = propertyBody.property_name.toLowerCase();
  return Property.create(propertyBody);
};

/**
 * Update property
 * @returns {Promise<Property>}
 * @param propertyId
 * @param propertyBody
 */
const updateProperty = async (propertyId, propertyBody) => {
  const property = await getPropertyByID(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property Not found');
  }
  if (propertyBody.property_name && (await Property.isPropertyNameTaken(propertyBody.property_name))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Property name already exists');
  }

  Object.assign(property, propertyBody);
  await property.save();
  return property;
};

/**
 * Query for properties
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProperties = async (filter, options) => {
  return await Property.paginate(filter, options);
};

const searchProperty = async (term) => {
  return Property.find({ property_name_lower: { $regex: term.trim().toLowerCase() } });
};

/**
 * Get Property By ID
 * @param {ObjectId} id
 * @returns {Promise<Property>}
 */
const getPropertyByID = async (id) => {
  return Property.findById(id);
};

const deletePropertyById = async (propertyId) => {
  const property = await getPropertyByID(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  await property.remove();
  return property;
};

module.exports = {
  createProperty,
  queryProperties,
  searchProperty,
  deletePropertyById,
  getPropertyByID,
  updateProperty,
};
