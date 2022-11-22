const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.set('view engine', 'ejs');
app.use("/login", loginRouter);
app.use("/", indexRouter);
app.use("/user", userRouter);

app.use(express.static('public'));
app.use(cookieParser());

app.listen(3000, function () {
    console.log("server on 3000");
})