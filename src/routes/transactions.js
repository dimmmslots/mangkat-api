/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();

const transactionControllers = require('../controllers/transactionController.js');

router.post('/', transactionControllers.addTransaction);

router.get('/', transactionControllers.getTransactions);

router.get('/:id', transactionControllers.getTransactionById);

router.get('/user/:id', transactionControllers.getTransactionByUserId);

module.exports = router;
