const newsController = require('../controllers/newsController');

const express = require('express');

const router = express.Router();
router.route("/getNews").get(newsController.getNews);

module.exports = router;
