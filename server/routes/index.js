const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const app = express();

const mysql = require('mysql');

var router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// credentials
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
    database: 'rem_data'
});

conn.connect();

router.get('/', (req, res) => {
    res.send('Test!');
});
router.get('/user/login/:email/:pass', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    var query = `SELECT id, fname, role FROM users WHERE email = "${req.params.email}" AND password = "${req.params.pass}"`;  
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        var data = ['success', rows[0].fname, rows[0].role, rows[0].id];
        if (rows.length > 0) {
            res.send(data);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/profile/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    var query = `SELECT * FROM users WHERE id = ${req.params.id}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });  

});
router.get('/user/announcements', (req, res) => {
    var query = 'SELECT * FROM announcements';
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/users/list', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    var query = 'SELECT * FROM users';
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.post('/user/announcements', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `INSERT INTO announcements (poster, title, body) VALUES ("${data.name}", "${data.title}", "${data.body}")`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.post('/users/add', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `INSERT INTO users (role, email, fname, mname, lname) VALUES ("${data.role}", "${data.email}", "${data.fname}", "${data.mname}", "${data.lname}")`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.post('/users/edit', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `UPDATE users SET role = "${data.role}", email = "${data.email}", password = "${data.password}", fname = "${data.fname}", mname = "${data.mname}", lname = "${data.lname}" WHERE id = ${data.id}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.delete('/users/edit', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `DELETE FROM users WHERE id = ${data.value}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.delete('/user/announcements', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var del_id_arr = "";
    data.id.forEach((el, i) => {
        del_id_arr += el + "," ;
    })

    var del_id = del_id_arr.slice(0, -1);
    var query = `DELETE FROM announcements WHERE id IN (${del_id})`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.post('/user/register', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `INSERT INTO users(email, password, fname, mname, lname, birthdate, contact, address) VALUES("${data.email}","${data.pass}","${data.fname}","${data.mname}", "${data.lname}", "${data.birthdate}", "${data.contact}", "${data.address}")`;  
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send('success');
    });
});
module.exports = router;