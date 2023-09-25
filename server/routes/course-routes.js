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

module.exports = router;
