const express = require('express');
const app =express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//homepage route

app.get('/' , (req, res) => {
    return res.send({
        error:false,
        message: "Welcome"
    })
})

// connection to mysql database
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'herb'
})
dbCon.connect();

//retrieve all herb name
app.get('/herb', (req, res) => {
    dbCon.query('SELECT * FROM name', (error, results, fields) => {
        if (error) throw error;

        let message =""
        if (results === undefined || results.length == 0) {
            message= "Empty";
        } else {
            message = "Successfully";
        }
        return res.send({ error: false, detail: results, message: message});
    })
});

//retrieve herb name by id
app.get('/herb/:HID', (req, res) => {
    let HID = req.params.HID;

    if(!HID) {
        return res.status(400).send({ error: true, message: "Please provide herb id"});
    }
    else
    {
        dbCon.query("SELECT * FROM name WHERE HID = ?" ,HID ,(error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "herb not found";
            }
            else
            {
                message = "Successfully retrieved herb data";
            }

            return res.send({error: false, detail: results[0], message: message});
        })
    }
})




app.listen(3000, () => {
    console.log('Listening on port 3000...');
})