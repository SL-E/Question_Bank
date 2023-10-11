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

module.exports = router;
