const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const readRouter = require('./routes/read');
const insertRouter = require('./routes/insert');

app.set('view engine', 'ejs');
app.use(layouts);
app.use("/read", readRouter);
app.use("/insert", insertRouter);
app.set('layout', 'readLayout', 'insertLayout');

app.get("/", function(req, res) {
    res.send('hello');
})

app.listen(3000, function () {
    console.log("server on 3000");
})