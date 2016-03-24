
var Mailgun = require('mailgun-js');

var SimpleMailgunAdapter = mailgunOptions => {
  if (!mailgunOptions || !mailgunOptions.apiKey || !mailgunOptions.domain || !mailgunOptions.fromAddress) {
    throw 'SimpleMailgunAdapter requires an API Key, domain, and fromAddress.';
  }
  var mailgun = Mailgun(mailgunOptions);

  var sendMail = mail => {
    var data = {
      from: mailgunOptions.fromAddress,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    }

    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, (err, body) => {
        if (typeof err !== 'undefined') {
          reject(err);
        }
        resolve(body);
      });
    });
  }

  return Object.freeze({
    sendMail: sendMail
  });
}

module.exports = SimpleMailgunAdapter
