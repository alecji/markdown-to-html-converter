import React, { useState } from 'react';
import { convertToHTML } from '../../api/convert';

import './MarkdownToHtml.css'

const MarkdownToHtml = () => {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    const getHTML = async () => {
        const rawResponse = await convertToHTML(markdown);
        setHtml(rawResponse.html)
    };

    return (
        <>
            <section className='convert'>
                <textarea
                    value={markdown}
                    onChange={e => setMarkdown(e.target.value)}
                    rows={10}
                    cols={50}
                    placeholder="Enter markdown here"
                />
                <button onClick={getHTML}>Convert</button>
                <textarea
                    value={html}
                    rows={10}
                    cols={50}
                    readOnly
                    placeholder="HTML conversion"
                />
            </section>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </>
    );
}

export default MarkdownToHtml;