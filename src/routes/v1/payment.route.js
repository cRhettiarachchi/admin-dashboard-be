const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { paymentController } = require('../../controllers');
const { paymentValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth('managePayments'), validate(paymentValidation.createPayment), paymentController.createPayment)
  .get(auth('getPayments', 'ownPayments'), validate(paymentValidation.getPayments), paymentController.getPayments);

module.exports = router;
