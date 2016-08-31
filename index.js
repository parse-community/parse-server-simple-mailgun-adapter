const Mailgun = require('mailgun-es6');

const SimpleMailgunAdapter = mailgunOptions => {
  if (!mailgunOptions || !mailgunOptions.apiKey || !mailgunOptions.domain || !mailgunOptions.fromAddress) {
    throw 'SimpleMailgunAdapter requires an API Key, domain, and fromAddress.';
  }
  const mailgun = new Mailgun({
    privateApi: mailgunOptions.apiKey,
    domainName: mailgunOptions.domain
  });

  const sendMail = mail => {
    const data = {
      from: mailgunOptions.fromAddress,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    };

    return mailgun.sendEmail(data);
  }

  return Object.freeze({
    sendMail: sendMail
  });
}

module.exports = SimpleMailgunAdapter
