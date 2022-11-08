const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nikhil@256',
    database: 'transport'
});

app.get("/", (req, res)=>{
    const tables = ['Account', 'Journey', 'Vehicle', 'Routes', 'Customer'];
    const header = ['#','Name', 'age', 'college'];
    const list = [[]];

    res.render("index", {header: header, list: list, tables: tables});
})

app.post("/", function (req, res) {
    renderData(req.body.table, res);
})

app.listen(3000, ()=>{
    console.log("Server is on 3000");
})


function renderData(table, response) {
    connection.connect(function (error) {
        if (error) console.log("client error:" + error + "client ends");
    
        const sql = `select * from ${table};`;
    
        connection.query(sql, function (err, res) {
            if (err) console.error();

            const header = Object.keys(res[0]);
            const tables = ['Account', 'Journey', 'Vehicle', 'Routes', 'Customer'];
            const list = [];

            for(var i = 0 ; i < res.length ; i++){
                const item = Object.values(res[i]);
                
                list.push(item);
            }

            console.log(list);

            response.render("index", {header: header, list: list, tables: tables});
        })
    });
}
