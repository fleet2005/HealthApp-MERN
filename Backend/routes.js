const express = require("express");
const router = express.Router();
const { signin } = require("./controllerFunction");
const { signup } = require("./controllerFunction");

router.post('/signin', signin);  

router.post('/signup', signup);


module.exports = router;
