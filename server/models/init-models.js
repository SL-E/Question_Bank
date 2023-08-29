var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _courses = require("./courses");
var _divisions = require("./divisions");
var _question_types = require("./question_types");
var _questions = require("./questions");
var _teachers = require("./teachers");
var _universities = require("./universities");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var divisions = _divisions(sequelize, DataTypes);
  var question_types = _question_types(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var teachers = _teachers(sequelize, DataTypes);
  var universities = _universities(sequelize, DataTypes);

  questions.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(questions, { as: "questions", foreignKey: "course_id"});
  teachers.belongsTo(divisions, { as: "division", foreignKey: "division_id"});
  divisions.hasMany(teachers, { as: "teachers", foreignKey: "division_id"});
  questions.belongsTo(question_types, { as: "type", foreignKey: "type_id"});
  question_types.hasMany(questions, { as: "questions", foreignKey: "type_id"});
  courses.belongsTo(teachers, { as: "tid_teacher", foreignKey: "tid"});
  teachers.hasMany(courses, { as: "courses", foreignKey: "tid"});
  divisions.belongsTo(universities, { as: "uid_university", foreignKey: "uid"});
  universities.hasMany(divisions, { as: "divisions", foreignKey: "uid"});
  teachers.belongsTo(universities, { as: "uid_university", foreignKey: "uid"});
  universities.hasMany(teachers, { as: "teachers", foreignKey: "uid"});

  return {
    admin,
    courses,
    divisions,
    question_types,
    questions,
    teachers,
    universities,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
