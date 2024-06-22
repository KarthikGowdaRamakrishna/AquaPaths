const weatherController = require('../controllers/weatherController');

const express = require('express');

const router = express.Router();
router.route("/getWeather").post(weatherController.getWeather);

module.exports = router;
