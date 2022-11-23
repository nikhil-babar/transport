const express = require('express');
const cookie = require('cookie-parser');
const router = express.Router();
const auth = require("../middleware/authentication")
const routes = require('../models/routeModel');
const vehicles = require('../models/vehicleModel');
const journey = require('../models/journeyModel');
const customers = require('../models/customerModel');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

router.use(cookie());

router.get("/", auth, async (req, res)=>{
    try {
        const routeData = await getData(routes, {});
        const vehicleData = await getData(vehicles, {});

        let sourceArray = [], destinationArray = [], vehicleArray = [];

        routeData.forEach(element => {
            sourceArray.push(element.source);
            destinationArray.push(element.destination);
        });

        vehicleData.forEach(element => {
            vehicleArray.push(element.type);
        })

        res.render("index", {sourceArray: sourceArray, destinationArray: destinationArray, vehicleArray: vehicleArray});
    } catch (error) {
        console.log(error);
    }
})

router.post("/", auth, async (req, res)=>{
    try {
        const route = await getData(routes, {source: req.body.source, destination: req.body.destination});
        const vehicle = await getData(vehicles, {type: req.body.type});
        const customer = await getData(customers, {name: req.user.name});

        console.log(req.body.source);
        console.log(req.body.destination);
        console.log(req.body.type);

        if(route == null|| vehicle == null|| customer == null) res.send("error");

        else{
            const journeyData = new journey({
                route: route[0],
                vehicle: vehicle[0],
                customer: customer[0]
            })

            journeyData.save();
    
            res.send("successful");
        }

    } catch (error) {
        console.log(error);
    }
})

router.delete("/", auth, (req, res)=>{
    res.clearCookie("token");

    res.redirect("/");
})

async function getData(model, parameter) {
    return new Promise((resolve, reject) => {
        model.find(parameter, function (err, data) {
            if(err) reject(err);

            else{
                if(data.length == 0){
                    resolve(null);
                }
                else{
                    const list = [];

                    resolve(data);
                }
            }
        })
    })
}


module.exports = router;