import React, { useState } from 'react';
import { convertToHTML } from '../../api/convert';

import './MarkdownToHtml.css'

const MarkdownToHtml = () => {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');
    const [error, setError] = useState(null);

    const getHTML = async () => {
        try {
           const htmlResponse = await convertToHTML(markdown);
            setHtml(htmlResponse)  
            setError(null)
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <>
            <section className='convert'>
                <textarea
                    data-testid='enterMarkdownTextBox'
                    value={markdown}
                    onChange={e => setMarkdown(e.target.value)}
                    rows={10}
                    cols={50}
                    placeholder="Enter markdown here"
                />
                <button data-testid='convert-btn' onClick={getHTML}>Convert</button>
                <textarea
                    data-testid='html-conversion-box'
                    value={html}
                    rows={10}
                    cols={50}
                    readOnly
                    placeholder="HTML conversion"
                />
                 {error && <p>{error}</p>}
            </section>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </>
    );
}

export default MarkdownToHtml;