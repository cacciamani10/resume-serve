const PORT = process.env.PORT || 5000;

const fs = require('fs');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
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
    let text;
    // Add in logic for which fields are filled out to customize which email to send

    // if (req.orginization === '' && req.) {
    //     text = `Thank you for contacting me. This is an automatic`
    // }
    // let mailReply = {
    //     from: process.env.GMAIL_ADDRESS,
    //     to: req.body.email,
    //     subject: 'Thank you for your message',
    //     text: `Thank you for contacting me from ${req.orginization}`
    // };
    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) { console.log(err); }
    //     else {
    //       console.log(`Message ${info.messageId} sent ${info.response}`);
    //       res.redirect('/login');
    //     }
    // });
})



app.listen(PORT);