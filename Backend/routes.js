const express = require("express");
const router = express.Router();
const { signin } = require("./controllerFunction");
const { signup } = require("./controllerFunction");

router.post('/signin', signin);  

router.post('/signup', signup);

router.get("/", (req,res)=>{
    res.send("hosted successfully");
})

module.exports = router;
