const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('ConvertController', () => {
  it('should convert markdown to html', (done) => {
    const markdown = `
    # Sample Document

    Hello!

    This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.
    `;

    chai.request(server)
      .post('/api/v1/convertToHtml')
      .send({ markdown })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('html');
        expect(res.body.html).to.equal(`<h1>Sample Document</h1><p>Hello!</p><p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>`);
        done();
      });
  });

  it('should handle error', (done) => {
    const markdown = undefined;

    chai.request(server)
      .post('/api/v1/convertToHtml')
      .send({ markdown })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});