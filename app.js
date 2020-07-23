const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./back/router");
var mailer = require("nodemailer");

var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "clement.noe.40160@gmail.com",
        pass: "idiote06"
    }
});


const app = express();
mongoose.connect("mongodb+srv://clad:clad@cluster0-wmbcr.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
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

// routing
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

app.post('/mail.html', function (req, res) {

// fonction d'envoi de mail en recuperant les informations dans la requete
    var mailist = [req.body.mailsend, "clement.noe@hotmail.com"]
    var mail = {
        from: "clement.noe.40160@gmail.com",
        to: mailist,
        subject: req.body.title,
        html: '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>'+req.body.title+'</title></head><body style="text-align:center;"><h1>Voici le mail que vous avez envoyé</h1><h2>Titre: '+req.body.title+'</h2><p>'+req.body.text+'</p></body></html>'
    };


    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log("Erreur lors de l'envoie du mail!");
            console.log(error);
        } else {
            console.log("Mail envoyé avec succès!")
        }
        smtpTransport.close();
    }); 

    res.sendFile(__dirname + '/mail.html');
});

module.exports = app;