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

function fetchData(table, columns, callback) {

    if(Array.isArray(columns)){
        columns = columns.join(',');
    }

    const sql = `select ${columns} from ${table}`;

    connection.connect(function (err) {
        if(err) console.error();

        else{
            connection.query(sql, function (err, data) {
                callback(data);
            })
        }
    })
}

router.get("/", function (req, res) {
    res.render("empty", {layout: "readLayout", message: "Please enter some query"});
})

router.post("/", function (req, res) {
    let table = req.body.table;
    let columns = req.body.column;

    fetchData(table, columns, function (data) {
        
        if(data == null){
            res.render("empty", {layout: "readLayout", message: "Please enter a valid query"});
        }

        else if(data.length == 0){
            res.render("empty", {layout: "readLayout", message: "No data available"});
        }

        else{
            const header = Object.keys(data[0]);
            const list = [];
    
            data.forEach(element => {
                list.push(Object.values(element));
            });
    
            console.log(header);
            console.log(list);
    
            res.render('read', {header: header, list: list, layout: "readLayout"});
        }
    })
})

module.exports = router;



