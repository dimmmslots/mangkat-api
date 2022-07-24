const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
// eslint-disable-next-line max-len
const destinationControllers = require('../controllers/destinationController.js');

router.get('/', destinationControllers.getDestinations);

router.get('/id/:id', destinationControllers.getDestinationById);

router.get('/name/:name?', destinationControllers.getDestinationByName);

module.exports = router;
