const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');
const e = require('express');

const nodemailer = require('nodemailer');

var router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: "c347695f25be88",
      pass: "cedb7cc5977f6c"
    }
 });

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
router.get('/user/forgot/:email', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    var query = `SELECT password FROM users WHERE email = "${req.params.email}"`;  
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            const mailOptions = {
                from: 'no-reply@gmail.com', // Sender address
                to: req.params.email, // List of recipients
                subject: 'Password Recovery', // Subject line
                html: `<h2>It seems that you forget the password for your account</h2>
                        <p>The password you requested to recover is: </p>
                        <h3>${rows[0].password}</h3>
                        <p>Use this to login to your account!</p>
                `
            };
            transport.sendMail(mailOptions, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(info);
                }
            });

            res.send(rows);
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
router.get('/user/dashboard/:id/:role', (req, res) => {
    var query;
    if (req.params.role === "admin" || req.params.role === "staff") {
        query = `SELECT amount, MIN(DATE_FORMAT(due,"%M %d, %Y")) as due, COUNT(status) as pending FROM payments WHERE status = "pending"`;
    } else {
        query = `SELECT amount, MIN(DATE_FORMAT(due,"%M %d, %Y")) as due, COUNT(status) as pending FROM payments WHERE status = "pending" AND user_id = ${req.params.id}`;
    }
    
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
router.get('/user/transactions/:id', (req, res) => {
    var query = `SELECT * FROM payments WHERE user_id = ${req.params.id}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/payments/:id', (req, res) => {
    var query = `SELECT * FROM payments WHERE user_id = ${req.params.id} AND status = "pending"`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/validate/payments', (req, res) => {
    var query = `SELECT *,DATE_FORMAT(paidAt,"%M %d, %Y") as paidAt FROM payments WHERE status = "pending" AND paidAT IS NOT NULL`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/propertylist', (req, res) => {
    var query = 'SELECT * FROM propertylist';
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/propertylist/details/:id', (req, res) => {
    var query = `SELECT * FROM propertylist WHERE id = ${req.params.id}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/propertylist/approved', (req, res) => {
    var query = `SELECT id, name, address FROM payments WHERE status = "approved"`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.get('/user/propertyinfo/:id', (req, res) => {
    var query = `SELECT name, address, due, amount FROM payments WHERE id = ${req.params.id}`;
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
router.get('/users/list/approved', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    var query = 'SELECT buyer, name, due, amount FROM payments WHERE status = "approved"';
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send('failed');
        }
    });
});
router.post('/user/profile/update/:which', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    if (req.params.which === 'account') {
        var query = `UPDATE users SET email = "${req.body.email}", fname = "${req.body.fname}", mname = "${req.body.mname}", lname = "${req.body.lname}", contact = "${req.body.contact}", bio = "${req.body.bio}" WHERE id = ${req.body.id}`;
    } else {
        var query = `UPDATE users SET password = "${req.body.password}" WHERE id = ${req.body.id}`;
    }
    
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.post('/user/validate/payments', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `UPDATE payments SET status = "${data.status}" WHERE id = ${data.id}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.post('/user/payment/pay', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `UPDATE payments SET reference = "${data.reference}", paidAt = "${data.paidAt}" WHERE id = ${data.id}`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
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
router.post('/user/propertylist/add', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `INSERT INTO propertylist (name, description, address, owner, monthly, due) VALUES ("${data.name}", "${data.desc}","${data.address}", "${data.owner}", "${data.price}", DATE_ADD("${data.due}", INTERVAL 1 MONTH))`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;

        res.send('success');
    });
});
router.post('/user/property/purchase', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    
    var query = `INSERT INTO payments (user_id, buyer, name, address, amount, due) VALUES ("${data.user_id}", "${data.user_name}","${data.name}", "${data.address}", "${data.price}", DATE_ADD("${data.due}", INTERVAL 1 MONTH))`;
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