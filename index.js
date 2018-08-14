
var Mailgun = require('mailgun-js');

var SimpleMailgunAdapter = mailgunOptions => {
  if (!mailgunOptions || !mailgunOptions.apiKey || !mailgunOptions.domain || !mailgunOptions.fromAddress) {
    throw 'SimpleMailgunAdapter requires an API Key, domain, and fromAddress.';
  }
  var mailgun = Mailgun(mailgunOptions);

  var sendMail = mail => {
    var data = Object.assign({}, mail, { from: mailgunOptions.fromAddress });

    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, (err, body) => {
        if (typeof err !== 'undefined') {
          reject(err);
          return;
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
