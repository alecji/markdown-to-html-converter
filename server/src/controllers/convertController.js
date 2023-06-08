const express = require("express");
const router = express.Router();

const ConvertService = require("../services/convertService");

router.post('/api/v1/convertToHtml', (req, res) => {
    try {
        const { markdown } = req.body;
        const html = ConvertService.convertMarkdownToHTML(markdown)
        return res.json({ html });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

module.exports = router;