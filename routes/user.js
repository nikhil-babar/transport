const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Customer = require("../models/customerModel")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function (req, res) {
    res.render("user");
})

router.post("/", async function (req, res) {
    try {
        const data = req.body;
        const user = {
            'name': data.name,
            'email': data.email,
            'age': data.age,
            'contactNo': data.contactNo,
            'userName': data.userName,
            'password': data.password
        }

        await addUser(user);

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.cookie("token", token, {
            httpOnly: true
        })

        res.redirect("/index");

    } catch (error) {
        console.log(error);
        res.send("error");
    }
})

async function addUser(user) {
    return new Promise((resolve, reject) => {
        const createUser = new Customer(user);

        createUser.save().then(()=>resolve(true)).catch((err)=>reject(err));
    })
}

module.exports = router;