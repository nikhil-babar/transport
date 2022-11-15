const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { json } = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nikhil@256',
    database: 'transport'
});

const db = connection.promise();

async function fetchData(query, tables) {
    let data = [];
    switch (query.tag) {
        case 'tables':
            data = await db.execute('show tables;');
            return data.at(0);
        case 'Attributes':
            const output = [];
            tables.forEach(async function (element) {
                let temp = await db.execute(`describe ${element}`);
                let list = [];
                temp.at(0).forEach(element => {
                    list.push(element);
                    console.log(element);
                })
                output.push([element, list.join(',')]);
            });

            return output;

        default:
            break;
    }
    return data.at(0);
}

function tables() {
    const tables = [];

    fetchData('tables', null).then(data => {
        data.forEach(element => {
            tables.push(Object.values(element).at(0));
        });

        console.log(tables);

        fetchData('Attributes', tables);
    }).then(data => console.log(data))
        .catch(err => console.error());

}

router.get("/", function (req, res) {
    tables();
    res.send("hi");
})


module.exports = router;