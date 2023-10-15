var express = require('express');
var router = express.Router();

router.get('/universitiesList', async function(req, res, next) {

    const universitiesModel = req.options.models.universities;
    try {
        const universitiesList = await universitiesModel.findAll();
        res.send(JSON.stringify(universitiesList));
    } catch (error) {
        console.error('Error retrieving universitiesList:', error);
        throw error;
    }
});


module.exports = router;