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

const autoResponseText = (r) => {
    if (r.name.trim() === '') {
        if (r.orginization.trim() === '') {
            return `Thank you for your message, I will get back to you as soon as I can.`;
        }
        else {
            return `Thank you for contacing me from ${r.orginization}, I will get back to you as soon as I can.`;
        }
    }
    else {
        if (r.orginization.trim() === '') {
            return `Thank you for contacing me ${r.name}, I will get back to you as soon as I can.`;
        }
        else {
            return `Thank you ${r.name} for contacting me from ${r.orginization}, I will get back to you as soon as I can.`;
        }
    }
}

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
    let r = req.body;
    console.log('Request received', r);
    let text = autoResponseText(r);
    
    // Send notification to myself
    let mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: process.env.GMAIL_ADDRESS,
        subject: `Contact Portfolio from Orgination: ${r.orginization}`,
        text: `Message: ${r.message}\nEmail: ${r.email}\nName ${r.name}`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) { 
            console.log(err); 
        }
        else {
            console.log('Successfully sent info');
        }
        // Send Automatic Response
        mailOptions = {
            from: process.env.GMAIL_ADDRESS,
            to: req.body.email,
            subject: 'Auto Reply: Jacob Cacciamani Developer Contact',
            text: text
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) { 
                console.log(err); 
                res.sendStatus(500);
            }
            else {
                console.log('Finished email sequence');
                res.sendStatus(200);
            }
        });
    });
});

app.listen(PORT);