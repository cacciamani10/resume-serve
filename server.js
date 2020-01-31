const PORT = process.env.PORT || 5000;

const fs = require('fs');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Startup Email Service
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD
  }
});

transporter.verify((err, success) => {
    if (err) { console.log('Transporter Error', err); }
    else { console.log('Successful connection', success); }
  });

// Route to serve resume
app.get('/', (req, res) => {
    var data = fs.readFileSync('./pdf/Resume_Jacob_Cacciamani_2020.pdf');
    res.contentType("application/pdf");
    res.send(data);
});

// Route to handle emails
app.post('/', (req, res) => {
    console.log('Email sent', req.body);
    res.send(req.body);
})



app.listen(PORT);