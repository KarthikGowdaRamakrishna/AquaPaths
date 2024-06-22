const portController = require('../controllers/portController');

const express = require('express');

const router = express.Router();
router.route("/portData").get(portController.getPortData);

module.exports = router
