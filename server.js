const PORT = process.env.PORT || 5000;

const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    var data = fs.readFileSync('./pdf/Resume_Jacob_Cacciamani_2020.pdf');
    res.contentType("application/pdf");
    res.send(data);
});

app.listen(PORT);