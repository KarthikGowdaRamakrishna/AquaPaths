const seaController = require('../controllers/seaController');

const express = require('express');

const router = express.Router();
router.route("/getRoute").post(seaController.getRoute);

module.exports = router;
