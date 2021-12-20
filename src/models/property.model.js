const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { propertyTypes } = require('../config/roles');

const propertySchema = mongoose.Schema(
  {
    property_name: {
      type: String,
      required: true,
      trim: true,
    },
    property_name_lower: {
      type: String,
      required: true,
      trim: true,
    },
    property_type: {
      type: String,
      required: true,
      enum: propertyTypes,
      trim: true,
    },
    no_of_rooms: {
      type: Number,
      required: true,
      trim: true,
    },
    address_line_1: {
      type: String,
      required: true,
      trim: true,
    },
    address_line_2: {
      type: String,
      trim: true,
    },
    town: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    post_code: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    tenants: [
      {
        tenent_id: {
          type: mongoose.Schema.ObjectId,
        },
        room_no: Number,
      },
    ],
  },
  { timeStamp: true }
);

/**
 * Check if email is taken
 * @param property_name
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
propertySchema.statics.isPropertyNameTaken = async function (property_name, excludeUserId) {
  const property = await this.findOne({ property_name, _id: { $ne: excludeUserId } });
  return !!property;
};

// add plugin that converts mongoose to json
propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);

/**
 * @typedef Property
 */
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
