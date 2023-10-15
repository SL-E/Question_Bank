var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");

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

router.get('/divisionListByUniversities', async function(req, res, next) {

    const universities = req.query.universitiesId;
    const univerDivisionModel = req.options.models.universities_division;
    const divisionModel = req.options.models.divisions;
    try {
        const divisionIdList = await univerDivisionModel.findAll({
            where: {
                universities_id: universities,
            },
        });
        if (divisionIdList.length === 0) {
            res.send(JSON.stringify([]));
        }
        let divisionIdArr = [];
        for (let i = 0;i<divisionIdList.length;i++) {
            divisionIdArr.push({
                id: divisionIdList[i].division_id,
            });
        }
        const divisionList = await divisionModel.findAll({
            where: {
                [Op.or]: divisionIdArr
            }
        });
        res.send(JSON.stringify(divisionList));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/getUniversitiesByDivision', async function(req, res, next) {

    const divisionId = req.query.divisionId;
    const univerDivisionModel = req.options.models.universities_division;
    const divisionModel = req.options.models.divisions;
    try {
        const univerInfo = await univerDivisionModel.findOne({
            where: {
                division_id: divisionId,
            },
        });
        const universitiesId = univerInfo.universities_id;
        const datas = await univerDivisionModel.findAll({
            where: {
                universities_id: universitiesId,
            }
        });
        let divisionIdArr = [];
        for (let i = 0;i<datas.length;i++) {
            divisionIdArr.push({
                id: datas[i].division_id
            });
        }
        const divisionList = await divisionModel.findAll({
            where: {
                [Op.or]: divisionIdArr
            }
        });
        const d = {
            universitiesId: universitiesId,
            divisionList: divisionList
        };
        res.send(JSON.stringify(d));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

module.exports = router;