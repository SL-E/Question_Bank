var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _courses = require("./courses");
var _divisions = require("./divisions");
var _exam = require("./exam");
var _exam_update_record = require("./exam_update_record");
var _question = require("./question");
var _question_options = require("./question_options");
var _question_types = require("./question_types");
var _tags = require("./tags");
var _teachers = require("./teachers");
var _universities = require("./universities");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var divisions = _divisions(sequelize, DataTypes);
  var exam = _exam(sequelize, DataTypes);
  var exam_update_record = _exam_update_record(sequelize, DataTypes);
  var question = _question(sequelize, DataTypes);
  var question_options = _question_options(sequelize, DataTypes);
  var question_types = _question_types(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var teachers = _teachers(sequelize, DataTypes);
  var universities = _universities(sequelize, DataTypes);

  teachers.belongsTo(divisions, { as: "division", foreignKey: "division_id"});
  divisions.hasMany(teachers, { as: "teachers", foreignKey: "division_id"});
  question_options.belongsTo(question, { as: "question", foreignKey: "question_id"});
  question.hasMany(question_options, { as: "question_options", foreignKey: "question_id"});
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
    exam,
    exam_update_record,
    question,
    question_options,
    question_types,
    tags,
    teachers,
    universities,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
