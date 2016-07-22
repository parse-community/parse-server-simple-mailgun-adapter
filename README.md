# parse-server-simple-mailgun-adapter
Used to send Parse Server password reset and email verification emails though Mailgun


## How to use
```
var server = ParseServer({
  ...
  emailAdapter: {
    module: 'parse-server-simple-mailgun-adapter',
    options: {
      // The address that your emails come from
      fromAddress: 'no-reply@yourdomain.com',
      // Your domain from mailgun.com
      domain: 'mg.yourdomain.com',
      // Your API key from mailgun.com
      apiKey: 'key-0123456789abcdefghijklmnopqrstuv',
      // Verification email subject
      verificationSubject: 'Please verify your e-mail for %appname%',
      // Verification email body
      verificationBody: 'Hi,\n\nYou are being asked to confirm the e-mail address %email% with %appname%\n\nClick here to confirm it:\n%link%',
      // Password reset email subject
      passwordResetSubject: 'Password Reset Request for %appname%',
      // Password reset email body
      passwordResetBody: 'Hi,\n\nYou requested a password reset for %appname%.\n\nClick here to reset it:\n%link%'
    }
  }
  ...
});
```

## Variables 

Customize the e-mail sent to your users when they reset their password or when we verify their email address. The following variables will be automatically filled in with their appropriate values:

`%username%` the user's display name

`%email%` the user's email address

`%appname%` your application's display name

`%link%` the link the user must click to perform the requested action