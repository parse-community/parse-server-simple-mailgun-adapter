describe('SimpleMailgunAdapter', () => {
  const simpleMailgunAdapter = require('../index.js');

  describe('test api call', () => {

    it('should fail to initialize when no parameters are passed', () => {
      expect(() => { simpleMailgunAdapter() }).toThrow();
    });

    it('should fail to initialize when null parameter is passed', () => {
      expect(() => { simpleMailgunAdapter(null) }).toThrow();
    });

    it('should initialize the api', () => {
      const api = simpleMailgunAdapter({ apiKey: '123', domain: 'foo.com', fromAddress: 'root@foo.com' });
      expect(typeof api.sendMail).toBe('function');
    });

    it('integration test, enter your own parameters', () => {
      const appkey = process.env.MAILGUN_APPKEY;
      const domain = process.env.MAILGUN_DOMAIN;
      const toAddress = process.env.MAILGUN_TO;
      const fromAddress = process.env.MAILGUN_FROM;

      if (!appkey || !domain || !toAddress || !fromAddress) {
        console.log('no mailgun env variables found, ignore integration test');
      } else {
        const api = simpleMailgunAdapter({ apiKey: appkey, domain: domain, fromAddress: fromAddress });
        api.sendMail({ to: toAddress, subject: 'Integration Test', text: 'this is a test email' });
      }
    });

  });
});
