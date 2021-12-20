var Mailgun = require('mailgun-js');

//Your sending email address
var from_who = process.env.EMAIL_FROM;

var mailgun = new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, password, name, phone) => {
  var data = {
    //Specify email data
    from: from_who,
    //The email to contact
    to: [...to],
    //Subject and text data
    subject: subject,
    html: `Hi ${name}!

      Your dashboard account is created successfully. Please use the following credentials to login. Please note that you will have to reset your password on the first login as a security measure.

      email/phone: ${to[0]}/${phone}
      password: ${password}
      `,
  };

  mailgun.messages().send(data, function (err, body) {
    if (err) {
      console.log('got an error: ', err);
    } else {
      console.log(body);
    }
  });
};

module.exports = {
  sendEmail,
};
