const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { propertyValidation } = require('../../validations');
const { propertyController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageProperties'), validate(propertyValidation.createProperty), propertyController.createProperty)
  .get(auth('getProperties'), validate(propertyValidation.getProperties), propertyController.getProperties);

router
  .route('/search')
  .get(auth('getProperties'), validate(propertyValidation.searchProperties), propertyController.searchProperties);

router
  .route('/:propertyId')
  .get(auth('getProperties'), validate(propertyValidation.getPropertyById), propertyController.getPropertyByID)
  .patch(auth('manageProperties'), validate(propertyValidation.updateProperty), propertyController.updateProperty)
  .delete(auth('manageProperties'), validate(propertyValidation.deleteProperty), propertyController.deleteProperty);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management
 */

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create property
 *     description: Only admins can create properties.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - PropertyType
 *               - no_of_rooms
 *               - address_line_1
 *               - town
 *               - region
 *               - country
 *               - postCode
 *             properties:
 *               PropertyType:
 *                 type: string
 *               no_of_rooms:
 *                 type: number
 *               address_line_1:
 *                 type: string
 *                 description: Required the address line 1
 *               address_line_2:
 *                  type: string
 *               town:
 *                  type: string
 *               region:
 *                  type: string
 *               country:
 *                  type: string
 *               postCode:
 *                  type: string
 *               notes:
 *                  type: string
 *             example:
 *               PropertyType: HMO
 *               no_of_rooms: 2
 *               address_line_1: Address line 1
 *               address_line_2:
 *               town: fake town
 *               region: fake region
 *               postCode: fake postCode
 *               notes:
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Property'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *
 *   get:
 *     summary: Get all properties
 *     description: Only admins can retrieve all properties.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Properties'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
