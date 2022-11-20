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
    res.render("login", {message: ""});
})

router.delete("/", function (req, res) {
    res.render("login", {message: ""});
})

router.post("/", async function (req, res) {
    try {
        const {userName, password} = req.body;
    
        const data = await checkUser(userName, password);

        if(data === null){
            res.render("login", {message: "Please enter valid details"});
        }

        else{
            const token = jwt.sign(data.toJSON(), process.env.ACCESS_TOKEN_SECRET);

            res.cookie("token",token,{
                httpOnly: true
            });

            res.redirect("/index");
        }

    } catch (error) {
        console.log(error);
        res.statusCode(404).send(error);
    }
})

function checkUser(userName, password) {
    return new Promise((resolve, reject) => {
        Customer.find({userName: userName, password: password}, function (err, data) {
            if(err) reject(err);

            else{
                if(data.length == 0){
                    resolve(null);
                }
                else{
                    resolve(data[0]);
                }
            }
        })
    })
}

module.exports = router;