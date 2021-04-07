
const Mailgun = require('mailgun.js');

const SimpleMailgunAdapter = mailgunOptions => {
  if (!mailgunOptions || !mailgunOptions.apiKey || !mailgunOptions.domain || !mailgunOptions.fromAddress) {
    throw 'SimpleMailgunAdapter requires an API Key, domain, and fromAddress.';
  }
  const mailgunClient = Mailgun.client({
    username: 'api',
    key: mailgunOptions.apiKey
  });

  const sendMail = mail => {
    const data = Object.assign({}, mail, { from: mailgunOptions.fromAddress });
    return mailgunClient.messages.create(mailgunOptions.domain, data);
  }

  return Object.freeze({
    sendMail: sendMail
  });
}

module.exports = SimpleMailgunAdapter
