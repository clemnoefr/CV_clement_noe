const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./back/router");


const app = express();
mongoose.connect("mongodb+srv://clad:clad@cluster0-wmbcr.mongodb.net/<dbname>?retryWrites=true&w=majority",
{ useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log("connexion à mongoDB réussie"))
.catch(() => console.log("échec connexion mongodb"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use("/css", express.static('css'));
app.use("/js", express.static('js'));
app.use("/img", express.static('img'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact.html', function (req, res) {
    res.sendFile(__dirname + '/contact.html');
});
app.get('/competences.html', function (req, res) {
    res.sendFile(__dirname + '/competences.html');
});
app.get('/historique.html', function (req, res) {
    res.sendFile(__dirname + '/historique.html');
});
app.get('/mail.html', function (req, res) {
    res.sendFile(__dirname + '/mail.html');
});
app.get('/mario.html', function (req, res) {
    res.sendFile(__dirname + '/mario.html');
});
app.use("/contact.html", routes);



module.exports = app;