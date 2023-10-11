var express = require('express');
var router = express.Router();

router.get('/divisionList', async function(req, res, next) {

    const divisionModel = req.options.models.divisions;
    try {
        const divisionList = await divisionModel.findAll({});
        res.send(JSON.stringify(divisionList));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

module.exports = router;