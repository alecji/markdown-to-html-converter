const chai = require('chai');
const ConvertService = require('../../src/services/convertService');
const expect = chai.expect;

describe('ConvertService', () => {
  describe('convertMarkdownToHTML', () => {
    it('should convert markdown to html', () => {
      const markdown = '# Heading 1';
      const html = ConvertService.convertMarkdownToHTML(markdown);
      expect(html).to.equal('<h1>Heading 1</h1>');
    });

    it('should convert markdown to html', () => {
      const markdown = 'Hello there';
      const html = ConvertService.convertMarkdownToHTML(markdown);
      expect(html).to.equal('<p>Hello there</p>');
    });
  });

  describe('_processHeaderElements', () => {
    it('should convert # to <h1> header', () => {
      const markdown = '# Testing Header';
      const html = ConvertService._processHeaderElements(markdown);
      expect(html).to.equal('<h1>Testing Header</h1>');
    });

    it('should convert 3 hashes to <h3> header', () => {
      const markdown = '### Testing Header';
      const html = ConvertService._processHeaderElements(markdown);
      expect(html).to.equal('<h3>Testing Header</h3>');
    });

    it('should not pass <h6> if there is over 6 hashes', () => {
      const markdown = '############# Testing Header';
      const html = ConvertService._processHeaderElements(markdown);
      expect(html).to.equal('<p>############# Testing Header</p>');
    });

    it('should not convert to header if there is an invalid character in hashes', () => {
      const markdown = '##@## Testing Header';
      const html = ConvertService._processHeaderElements(markdown);
      expect(html).to.equal('<p>##@## Testing Header</p>');
    });
  });

  describe('_processHyperlinkElements', () => {
    it('should convert markdown links to html links', () => {
      const markdown = '[Link text](https://www.example.com)';
      const html = ConvertService._processHyperlinkElements(markdown);
      expect(html).to.equal('<a href="https://www.example.com">Link text</a>');
    });
  });
});