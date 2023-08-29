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
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `text` varchar(500) NOT NULL,
  `image` blob,
  `correct_answer` varchar(255) NOT NULL,
  `type_id` int(5) NOT NULL,
  `course_id` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `question_types` (`id`),
  CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of questions
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

SET FOREIGN_KEY_CHECKS = 1;
