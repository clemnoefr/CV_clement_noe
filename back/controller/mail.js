var mailer = require("nodemailer");

var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "clement.noe.40160@gmail.com",
        pass: "idiote06"
    }
});

var mail = {
    from: "clement.noe.40160@gmail.com",
    to: "uuhuu@hotmail.fr",
    subject: "leSujetDuMail",
    html: "leCorpsDeVotreMessageEnHTML"
};


smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log("Erreur lors de l'envoie du mail!");
        console.log(error);
    }else{
        console.log("Mail envoyé avec succès!")
    }
    smtpTransport.close();
});

