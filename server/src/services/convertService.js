class ConvertService {
    static convertMarkdownToHTML(markdown){
        let paragraphs = markdown.split('\n\n');
        let html = paragraphs.map(paragraph => {
            if (paragraph !== "") {
                let lines = paragraph.split('\n');
                let trimmed = lines[0].trim();
                if (trimmed.startsWith('#')) {
                    return this._processHeaderElements(trimmed)
                } else {
                    return `<p>${lines.map(line => this._processInlineElements(line.trim())).join('\n')}</p>`;
                }
            }
          
        }).join('');
        return html;
    }

    static _processHeaderElements(trimmed) {
        let headerLevel = Math.min(trimmed.lastIndexOf('#') + 1, 6);
        let text = trimmed.substring(headerLevel).trim();
        return `<h${headerLevel}>${this._processInlineElements(text)}</h${headerLevel}>`;
    }
    
    static _processInlineElements(text) {
        return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    }
}

module.exports = ConvertService;