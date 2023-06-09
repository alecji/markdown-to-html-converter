import axios from 'axios';

export const convertToHTML = async (markdown = '') => {
        const response = await axios.post('/api/v1/convertToHtml', { markdown });
        if (response.status >= 300) {
            throw Error(response.status);
        }
        return response.data.html;
};