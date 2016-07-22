
var Mailgun = require('mailgun-js');

var SimpleMailgunAdapter = mailgunOptions => {
  if (!mailgunOptions || !mailgunOptions.apiKey || !mailgunOptions.domain || !mailgunOptions.fromAddress) {
    throw 'SimpleMailgunAdapter requires an API Key, domain, and fromAddress.';
  }

  mailgunOptions.verificationSubject =
    mailgunOptions.verificationSubject ||
    'Please verify your e-mail for %appname%';
  mailgunOptions.verificationBody =
    mailgunOptions.verificationBody ||
    'Hi,\n\nYou are being asked to confirm the e-mail address %email% ' +
    'with %appname%\n\nClick here to confirm it:\n%link%';
  mailgunOptions.passwordResetSubject =
    mailgunOptions.passwordResetSubject ||
    'Password Reset Request for %appname%';
  mailgunOptions.passwordResetBody =
    mailgunOptions.passwordResetBody ||
    'Hi,\n\nYou requested a password reset for %appname%.\n\nClick here ' +
    'to reset it:\n%link%';


  var mailgun = Mailgun(mailgunOptions);

  function fillVariables(text, options) {
    text = text.replace("%username%", options.user.get("username"));
    text = text.replace("%email%", options.user.get("email"));
    text = text.replace("%appname%", options.appName);
    text = text.replace("%link%", options.link);
    return text;
  }

  var sendVerificationEmail = options => {
    var data = {
      from: mailgunOptions.fromAddress,
      to: options.user.get("email"),
      subject: fillVariables(mailgunOptions.verificationSubject, options),
      text: fillVariables(mailgunOptions.verificationBody, options)
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

  var sendPasswordResetEmail = options => {
    var data = {
      from: mailgunOptions.fromAddress,
      to: options.user.get("email"),
      subject: fillVariables(mailgunOptions.passwordResetSubject, options),
      text: fillVariables(mailgunOptions.passwordResetBody, options)
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

  var sendMail = mail => {
    var data = {
      from: mailgunOptions.fromAddress,
      to: mail.to,
      subject: mail.subject,
      text: mail.text
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
    sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail
  });
}

module.exports = SimpleMailgunAdapter
