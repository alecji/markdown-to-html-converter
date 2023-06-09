class ConvertService {
    static convertMarkdownToHTML(markdown){
        let paragraphs = markdown.split('\n');
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
        const splitElements = trimmed.split(' ');
        const headerLevel = splitElements[0].lastIndexOf('#') + 1
        const text = trimmed.substring(headerLevel).trim();
        const isAllHashes = [...splitElements[0]].every(char => char === '#');
        if(headerLevel > 6 || !isAllHashes) return `<p>${this._processInlineElements(trimmed)}</p>`
        return `<h${headerLevel}>${this._processInlineElements(text)}</h${headerLevel}>`;
    }
    
    static _processInlineElements(text) {
        return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    }
}

module.exports = ConvertService;