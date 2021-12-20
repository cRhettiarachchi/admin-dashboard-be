const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { propertyService } = require('../services');

const createProperty = catchAsync(async (req, res) => {
  const property = await propertyService.createProperty(req.body);
  res.status(httpStatus.CREATED).send(property);
});

const updateProperty = catchAsync(async (req, res) => {
  const property = await propertyService.updateProperty(req.params.propertyId, req.body);
  res.status(httpStatus.CREATED).send(property);
});

const getProperties = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await propertyService.queryProperties(filter, options);
  res.send(result);
});

const searchProperties = catchAsync(async (req, res) => {
  const result = await propertyService.searchProperty(req.query.term);
  res.send(result);
});

const deleteProperty = catchAsync(async (req, res) => {
  await propertyService.deletePropertyById(req.params.propertyId);
  res.status(httpStatus.NO_CONTENT).send(true);
});

const getPropertyByID = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyByID(req.params.propertyId);
  res.send(property);
});

module.exports = {
  createProperty,
  getProperties,
  searchProperties,
  deleteProperty,
  getPropertyByID,
  updateProperty,
};
