const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');

var router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('Test!');
});
router.get('/user/:email/:pass', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const conn = mysql.createConnection({
        host: 'localhost',
        port: '3307',
        user: 'root',
        password: '',
        database: 'rem_data'
    });

    conn.connect();

    var query = `SELECT id, fname FROM users WHERE email = "${req.params.email}" AND password = "${req.params.pass}"`;  
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        var data = ['success', rows[0].fname];
        if (rows.length > 0) {
            res.send(data);
        } else {
            res.send('failed');
        }
    });
});
router.post('/user/register', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    const conn = mysql.createConnection({
        host: 'localhost',
        port: '3307',
        user: 'root',
        password: '',
        database: 'rem_data'
    });

    conn.connect();

    var query = `INSERT INTO users(email, password, fname, mname, lname, birthdate, contact, address) VALUES("${data.email}","${data.pass}","${data.fname}","${data.mname}", "${data.lname}", "${data.birthdate}", "${data.contact}", "${data.address}")`;  
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send('success');
    });
});
module.exports = router;