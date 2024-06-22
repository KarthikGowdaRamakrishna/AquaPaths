const userController = require('../controllers/userController');

const express = require('express');

const router = express.Router();
router.route("/signUp").post(userController.signUp);
router.route("/login").post(userController.login);
router.route("/googleLogin").post(userController.googleSignUp);
router.route("/saveRoute").put(userController.saveRoute);

module.exports = router

