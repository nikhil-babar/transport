const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

router.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nikhil@256',
    database: 'transport'
});

function genSqlValue(values){
    let str = [];

    values.forEach(element => {
        str.push(`'${element}'`);
    });

    return str.join(',');
}

function fetchData(table, attributes, values, response, callback) {
    let sql = `insert into ${table} (${(Array.isArray(attributes)) ? attributes.join(',') :`${attributes}`}) values (${(Array.isArray(values)) ? genSqlValue(values) :`'${values}'`});`;

    connection.connect(function (err) {
        if(err) response.render("empty", {layout: "insertLayout", message: "Connection to database failed"});

        else{
            connection.query(sql, function (err, res) {
                if(err){
                    console.log(err);
                    response.render("empty", {layout: "insertLayout", message: "Please enter a valid query"});
                }

                else{
                    console.log(res);
                    response.render("insert", {layout: "insertLayout", header: attributes, list: values});
                }
            })
        }
    })
}

router.get("/", function (req, res) {
    res.render("empty", {layout: "insertLayout", message: "Please enter some query"});
})

router.post("/", function (req, res) {
    let table = req.body.table;
    let attributes = req.body.attributes;
    let values = req.body.values;

    fetchData(table, attributes, values, res, function (data) {
        if(data == null){
            res.render("empty", {layout: "readLayout", message: "Please enter a valid query"});
        }

        else{
            const header = Object.keys(data[0]);
            const list = [];
    
            data.forEach(element => {
                list.push(Object.values(element));
            });
    
            console.log(header);
            console.log(list);
    
            res.render('insert', {header: header, list: list, layout: "insetLayout"});
        }
    })
})

module.exports = router;