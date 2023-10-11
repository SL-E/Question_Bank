var express = require('express');
var router = express.Router();

router.get('/tagsList', async function(req, res, next) {
    const tagsModel = req.options.models.tags;
    try {
        const tagsList = await tagsModel.findAll({});
        res.send(JSON.stringify(tagsList));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

module.exports = router;