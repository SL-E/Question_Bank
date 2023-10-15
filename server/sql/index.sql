/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50728 (5.7.28)
 Source Host           : localhost:3306
 Source Schema         : question_bank

 Target Server Type    : MySQL
 Target Server Version : 50728 (5.7.28)
 File Encoding         : 65001

 Date: 25/08/2023 16:56:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(5) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `permanent_email` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `number` varchar(20) NOT NULL,
  `tid` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tid` (`tid`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO courses (name, number, tid) VALUES ('Mathematics', 'CSMAX596', 1);
INSERT INTO courses (name, number, tid) VALUES ('Physics', 'CSMAX570', 2);

-- ----------------------------
-- Records of courses
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for divisions
-- ----------------------------
DROP TABLE IF EXISTS `divisions`;
CREATE TABLE `divisions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `uid` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `divisions_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `universities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of divisions
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for question_types
-- ----------------------------
DROP TABLE IF EXISTS `question_types`;
CREATE TABLE `question_types` (
  `id` int(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `grade` int(5) NOT NULL,
  `time_limite` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question_types
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `division_id` int(5) DEFAULT NULL,
  `uid` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `universities` (`id`),
  CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of teachers
-- ----------------------------
BEGIN;
INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `img_path`, `division_id`, `uid`) VALUES (1, 'Vimal\nAlvin', 'Kumar', 'xy580303', 'vimal.kumar@waikato.ac.nz', '4378', '/Users/glc/Desktop/Question_Bank Test/website-server/public/images/vkumar.jpeg', NULL, NULL);
INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `img_path`, `division_id`, `uid`) VALUES (2, 'Chris', 'Eames', 'xy580304', 'chris.eames@waikato.ac.nz', '4357', '/Users/glc/Desktop/Question_Bank Test/website-server/public/images/eames.jpeg', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for universities
-- ----------------------------
DROP TABLE IF EXISTS `universities`;
CREATE TABLE `universities` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of universities
-- ----------------------------
BEGIN;
COMMIT;


-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `question_id` INT PRIMARY KEY, -- Question ID, a unique identifier for the question
  `question_name` VARCHAR(255), -- Question Name, a brief description or title of the question
  `question_number` VARCHAR(255), -- Question Number, used for quick identification and referencing of the question
  `question_status` ENUM('Ready', 'Pending') NOT NULL, -- Status, the status of the question, such as Ready or Pending.
  `courses_id` INT, -- Courses ID, the ID of the course to which the question belongs
  `create_time` DATETIME, -- Create Time, the timestamp when the question was created
  `modified_time` DATETIME, -- Modified Time, the timestamp of the most recent modification to the question
  `author` VARCHAR(255), -- Author, the creator of the question
  `modified_author` VARCHAR(255), -- Modified Author, the person who made the most recent modification to the question
  `grade` INT, -- Grade, the difficulty level of the question, such as easy, medium, hard, etc.
  `comment` VARCHAR(255), -- Comment, the number of comments on the question
  `tags` VARCHAR(255), -- Tags, the tags associated with the question for categorization and search purposes
  `time_estimate` INT, -- Time Estimate, the estimated time required to answer the question
  `picture` VARCHAR(255) -- Picture, any relevant pictures related to the question
);

INSERT INTO question (question_id, question_name, question_number, question_status, courses_id, create_time, modified_time, author, modified_author, grade, comment, tags, time_estimate, picture)
VALUES (1, 'Sample Question', 'Q001', 'Ready', 1, NOW(), NOW(), 'John Doe', 'John Doe', 1, 'No comments', '["sample","CSS"]', 10, 'sample.jpg');

-- ----------------------------
-- Records of question
-- ----------------------------
BEGIN;
COMMIT;


-- ----------------------------
-- Table structure for question_options
-- ----------------------------
DROP TABLE IF EXISTS `question_options`;
CREATE TABLE  `question_options` (
  `id` INT PRIMARY KEY AUTO_INCREMENT, -- Unique identifier for each option
  `question_id` INT, -- Foreign key referencing the question this option belongs to
  `group_id` INT, -- Group id is the set id of a set of options
  `question_text` TEXT, -- Question Text, the detailed description and requirements of the question
  `options_order` VARCHAR(255) NOT NULL, -- Order of the options for display purposes
  `option_text` VARCHAR(255) NOT NULL, -- The text content of the option
  `question_type` ENUM('SingleChoice', 'MultiChoice', 'True-False') NOT NULL, -- Type of the option (Single choice, Multiple choice, True or False)
  FOREIGN KEY (`question_id`) REFERENCES `question`(`question_id`) -- Foreign key constraint referencing the question table
);

INSERT INTO question_options (question_id, group_id, question_text, options_order, option_text, question_type)
VALUES (1, 1, 'This is a sample question. Select the correct option.', 'A', 'Option A', 'SingleChoice'),
       (1, 1, 'This is a sample question. Select the correct option.', 'B', 'Option B', 'SingleChoice'),
       (1, 1, 'This is a sample question. Select the correct option.', 'C', 'Option C', 'SingleChoice'),
       (1, 1, 'This is a sample question. Select the correct option.', 'D', 'Option D', 'SingleChoice');

-- ----------------------------
-- Records of question_options
-- ----------------------------
BEGIN;
COMMIT;


SET FOREIGN_KEY_CHECKS = 1;
