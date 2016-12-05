var nodemailer = require('nodemailer');
var dotenv = require('dotenv').config();

module.exports = {
    submitSuggestion: submitSuggestion,
}

function submitSuggestion(req, res) {

  console.log("The req body" ,req.body)

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'caseysarcade@gmail.com', // Your email id
            pass: process.env.emailPW // Your password
        }
    });

    var mailOptions = {
        from: req.body.email, // sender address
        to: 'caseysarcade@gmail.com', // list of receivers
        subject: 'New Suggestion From: ' +req.body.email, // Subject line
        text: req.body.message,
    };

    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
}
