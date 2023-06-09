class ConvertService {
    static convertMarkdownToHTML(markdown) {
        let lines = markdown.split('\n');
        let html = "";
        let currentParagraph = [];
        for (let line of lines) {
            let trimmed = line.trim();
            if (trimmed === "") {
                // blank line
                if (currentParagraph.length > 0) {
                    html += `<p>${currentParagraph.map(line => this._processInlineElements(line)).join('\n')}</p>`;
                    currentParagraph = [];
                }
            } else if (trimmed.startsWith('#')) {
                // heading, end current paragraph and process heading
                if (currentParagraph.length > 0) {
                    html += `<p>${currentParagraph.map(line => this._processInlineElements(line)).join('\n')}</p>`;
                    currentParagraph = [];
                }
                html += this._processHeaderElements(trimmed);
            } else {
                currentParagraph.push(trimmed);
            }
        }
        // process any remaining paragraphs
        if (currentParagraph.length > 0) {
            html += `<p>${currentParagraph.map(line => this._processInlineElements(line)).join('\n')}</p>`;
        }
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