const express = require('express');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require("../middleware/authentication")

router.use(cookie());

router.get("/", auth, (req, res)=>{
    
})

router.delete("/", auth, (req, res)=>{
    res.clearCookie("token");

    res.redirect("/login");
})


module.exports = router;