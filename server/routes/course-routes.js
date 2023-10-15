var express = require('express');
var router = express.Router();


router.get('/courseList', async function(req, res, next) {
  const coursesModel = req.options.models.courses;
  try {
    const courses = await coursesModel.findAll();
    res.send(JSON.stringify(courses));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.post('/createCourse', async function(req, res, next) {
  const {name, number,division_id,tid,comments,create_date} = req.body;
  const coursesModel = req.options.models.courses;
  try {
    await coursesModel.create({
      name, number,division_id,tid,comments,create_date
    });
    res.send(JSON.stringify({isSuccess: true}));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.post('/deleteCourse', async function(req, res, next) {
  const {courseId} = req.body;
  const coursesModel = req.options.models.courses;
  try {
    const courseInfo = await coursesModel.findOne({
      where: {
        id: courseId,
      }
    });
    await courseInfo.destroy();
    res.send(JSON.stringify({isSuccess: true}));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.post('/editCourse', async function(req, res, next) {
  const {courseId, divisionId, name, number, tid, comments,createDate} = req.body;
  const coursesModel = req.options.models.courses;
  try {
    await coursesModel.update({
      name, comments, number, tid,
      division_id: divisionId,
      create_date: createDate,
    },{
      where: {
        id: courseId,
      }
    });
    res.send(JSON.stringify({isSuccess: true}));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.get('/courseListByDivision', async function(req, res, next) {
  const division_id = req.query.divisionId;
  let whereQuery = {};
  if (division_id && division_id !== "All") {
    whereQuery["division_id"] = division_id;
  }
  const coursesModel = req.options.models.courses;
  try {
    const courses = await coursesModel.findAll({
      where: whereQuery
    });
    res.send(JSON.stringify(courses));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.get('/searchCourseByData', async function(req, res, next) {
  const {divisionId, createDate, createBy} = req.query;
  let whereQuery = {};
  if (divisionId && divisionId !== "All") {
    whereQuery["division_id"] = divisionId;
  }
  if (createDate) {
    whereQuery["create_date"] = createDate;
  }
  if (createBy && createBy !== "All") {
    whereQuery["tid"] = createBy;
  }
  const coursesModel = req.options.models.courses;
  try {
    const courses = await coursesModel.findAll({
      where: whereQuery
    });
    res.send(JSON.stringify(courses));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.get('/searchCourse', async function(req, res, next) {
  const courseNo = req.query.courseNo;
  const coursesModel = req.options.models.courses;
  try {
    const courses = await coursesModel.findAll({
      where: {
        number: courseNo,
      }
    });
    res.send(JSON.stringify(courses));
  } catch (error) {
    console.error('Error retrieving courses:', error);
    throw error;
  }
});

router.get('/searchCourseById', async function(req, res, next) {
  const courseId = req.query.courseId;
  const coursesModel = req.options.models.courses;
  try {
    const courses = await coursesModel.findOne({
      where: {
        id: courseId,
      }
    });
    res.send(JSON.stringify(courses));
  } catch (error) {
    console.error('Error retrieving searchCourseById:', error);
    throw error;
  }
});

module.exports = router;
