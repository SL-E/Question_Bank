var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");

router.get('/searchTeacherByData', async function(req, res, next) {
    const {teacherIds} = req.query;
    const teachersModel = req.options.models.teachers;
    try {
        let whereOrArr = [];
        for (let i=0;i<teacherIds.length;i++) {
            whereOrArr.push({
                id: teacherIds[i]
            });
        }
        const teacherList = await teachersModel.findAll({
            where: {
                [Op.or]: whereOrArr
            }
        });
        res.send(JSON.stringify(teacherList));
    } catch (error) {
        console.error('Error retrieving searchTeacherByData:', error);
        throw error;
    }
});

router.get('/searchTeacherByName', async function(req, res, next) {
    const {teacherName} = req.query;
    const teachersModel = req.options.models.teachers;
    try {
        const teacherNameArr = teacherName.split(" ");
        if (teacherNameArr.length < 2) {
            res.send(JSON.stringify({}));
            return;
        }
        const teacherInfo = await teachersModel.findOne({
            where: {
                first_name: teacherNameArr[0],
                last_name: teacherNameArr[1]
            }
        });
        res.send(JSON.stringify(teacherInfo));
    } catch (error) {
        console.error('Error retrieving searchTeacherByData:', error);
        throw error;
    }
});

module.exports = router;
