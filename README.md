# parse-server-simple-mailgun-adapter
Used to send Parse Server password reset and email verification emails though Mailgun

## Integration test
If you want to run the integration test, you must specify your mailgun credentials via env variable, example:

```
MAILGUN_APPKEY='_KEY_' MAILGUN_DOMAIN='_DOMAIN_' MAILGUN_TO='_TO-ADDR_' MAILGUN_FROM='_FROM-ADDR_' npm t
```
