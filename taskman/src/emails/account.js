const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRIDAPIKEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sendgrid.raph@odrallag.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}. Let me know how you get a long with the app. Perfect.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sendgrid.raph@odrallag.com',
        subject: 'Sorry to see you go!',
        text: `Hi ${name}. Sorry to see you leave, but if you have any comments on your experience with our service please let us know. Thanks!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}