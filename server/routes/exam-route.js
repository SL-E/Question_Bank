var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");

router.get('/examList', async function(req, res, next) {
    const divisionNo = req.query.division_no;
    const courseNo = req.query.course_no;
    let whereQuery = {};
    if (divisionNo && divisionNo !== "All") {
        whereQuery["division_no"] = divisionNo;
    }
    if (courseNo && courseNo !== "All") {
        whereQuery["course_no"] = courseNo;
    }

    const examModel = req.options.models.exam;
    try {
        const examList = await examModel.findAll({
            where: whereQuery
        });
        res.send(JSON.stringify(examList));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/searchExam', async function(req, res, next) {
    // const division = req.query.division;
    const courseNo = req.query.courseNo;
    const examNo = req.query.examNo;
    const createBy = req.query.createBy;
    const createDate = req.query.createDate;
    const modifiedDate = req.query.modifiedDate;
    const tags = req.query.tags;
    const status = req.query.status;

    let whereQuery = [];
    // if (division !== "All" && division) {
    //     whereQuery["division_no"] = division;
    // }
    if (courseNo && courseNo.length !== 0) {
        whereQuery.push({
            [Op.or]: courseNo,
        });
    }
    if (examNo !== "All" && examNo) {
        whereQuery.push({
            exam_no: examNo,
        });
    }
    if (createBy !== "All" && createBy) {
        whereQuery.push({
            create_by: createBy,
        });
    }
    if (createDate !== "All" && createDate) {
        whereQuery.push({
            create_date: createDate,
        });
    }
    if (modifiedDate !== "All" && modifiedDate) {
        whereQuery.push({
            modified_date: modifiedDate,
        });
    }
    if (tags !== "All" && tags) {
        whereQuery.push({
            tags: tags,
        });
    }
    if (status !== "All" && status) {
        whereQuery.push({
            status: status,
        });
    }

    const examModel = req.options.models.exam;
    try {
        const examList = await examModel.findAll({
            where: {
                [Op.and]: whereQuery
            }
        });
        res.send(JSON.stringify(examList));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/exam', async function(req, res, next) {
    const examId = req.query.examId;

    const examModel = req.options.models.exam;
    try {
        const exam = await examModel.findOne({
            where: {
                id: examId,
            }
        });
        res.send(JSON.stringify(exam));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/examByNo', async function(req, res, next) {
    const examNo = req.query.examNo;

    const examModel = req.options.models.exam;
    try {
        const exam = await examModel.findOne({
            where: {
                exam_no: examNo,
            }
        });
        res.send(JSON.stringify(exam));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/examAllNo', async function(req, res, next) {
    const examModel = req.options.models.exam;
    let data = [];
    try {
        const exams = await examModel.findAll();
        for (let i=0;i<exams.length;i++) {
            data.push(exams[i].exam_no);
        }
        data = Array.from(new Set(data));
        res.send(JSON.stringify(data));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.post('/createExam', async function(req, res, next) {
    const { divisionNo, courseNo, examNo, createBy, createDate, tags, status, questions } = req.body;

    const examModel = req.options.models.exam;
    try {
        await examModel.create({
            division_no: divisionNo,
            course_no: courseNo,
            exam_no: examNo,
            create_by: createBy,
            create_date: createDate,
            tags, status, questions
        });
        res.send({ isSuccess: true });
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.post('/updateOriginExam', async function(req, res, next) {
    const { record } = req.body;

    const examModel = req.options.models.exam;
    try {
        const data = JSON.parse(record.update_record);
        await examModel.update(data,{
            where: {
                id: record.exam_id,
            }
        });
        res.send({ isSuccess: true });
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.post('/editExam', async function(req, res, next) {
    const { examId, courseNo, examNo, createBy, createDate, tags, status, questions } = req.body;

    // const examModel = req.options.models.exam;
    const examUpdateRecordModel = req.options.models.exam_update_record;
    try {
        const data = {
            course_no: courseNo,
            exam_no: examNo,
            create_by: createBy,
            create_date: createDate,
            tags,
            status,
            questions
        };
        await examUpdateRecordModel.create({
            exam_id: examId,
            update_record: JSON.stringify(data)
        });
        res.send({ isSuccess: true });
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.post('/editExamRecord', async function(req, res, next) {
    const { recordId, examId, updateRecord } = req.body;

    const examUpdateRecordModel = req.options.models.exam_update_record;
    try {
        await examUpdateRecordModel.update({
            exam_id: examId,
            update_record: updateRecord,
        }, {
            where: {
                id: recordId,
            }
        });
        res.send({ isSuccess: true });
    } catch (error) {
        console.error('Error retrieving editExamRecord:', error);
        throw error;
    }
});


router.get('/getExamChangeRecord', async function(req, res, next) {
    const examId = req.query.examId;
    const { exam_update_record: examUpdateRecordModel } = req.options.models;
    try {
        const examsRecord = await examUpdateRecordModel.findAll({
            where: {
                exam_id: examId,
            }
        });
        res.send(JSON.stringify(examsRecord));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/getExamChangeRecordById', async function(req, res, next) {
    const recordId = req.query.recordId;
    const { exam_update_record: examUpdateRecordModel } = req.options.models;
    try {
        const examsRecord = await examUpdateRecordModel.findOne({
            where: {
                id: recordId,
            }
        });
        res.send(JSON.stringify(examsRecord));
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

router.get('/getExamByIdFromUpdateRecord', async function(req, res, next) {
    const recordId = req.query.recordId;
    const { exam_update_record: examUpdateRecordModel } = req.options.models;
    try {
        const examsRecord = await examUpdateRecordModel.findOne({
            where: {
                id: recordId,
            }
        });
        if (!examsRecord) {
            res.send(JSON.stringify({}));
            return;
        }

        res.send(examsRecord.update_record);
    } catch (error) {
        console.error('Error retrieving examList:', error);
        throw error;
    }
});

module.exports = router;