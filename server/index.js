const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index')

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

var port = 4000;
var server = app.listen(port, () => {
    console.log("App listening at port: ", port);
});