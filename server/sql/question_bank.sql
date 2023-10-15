/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80100 (8.1.0)
 Source Host           : localhost:3306
 Source Schema         : question_bank

 Target Server Type    : MySQL
 Target Server Version : 80100 (8.1.0)
 File Encoding         : 65001

 Date: 10/10/2023 19:04:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` (`id`, `first_name`, `last_name`, `password`, `email`) VALUES (1, 'Jade', 'S', '$2a$10$2rC.fpxPIkXCNg6mQC7D5OZcyAuxyhMAxqk3Dq0zM9ZqU0TxD9/JO', 'js980923@outlook.com');
COMMIT;

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `number` varchar(20) NOT NULL,
  `tid` int NOT NULL,
  `division_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tid` (`tid`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of courses
-- ----------------------------
BEGIN;
INSERT INTO `courses` (`id`, `name`, `number`, `tid`, `division_id`) VALUES (1, 'Applied Geographic Information Systems for Research and Planning', 'GEOGY558', 1, 1);
INSERT INTO `courses` (`id`, `name`, `number`, `tid`, `division_id`) VALUES (2, 'Automated Spatial Analysis using Geographic Information Systems', 'GEOGY538', 1, 1);
INSERT INTO `courses` (`id`, `name`, `number`, `tid`, `division_id`) VALUES (3, 'Cyber Security', 'COMPX518', 2, 2);
INSERT INTO `courses` (`id`, `name`, `number`, `tid`, `division_id`) VALUES (4, 'Curriculum, Pedagogies and Multiliteracies', 'EDUCA562', 3, 2);
COMMIT;

-- ----------------------------
-- Table structure for divisions
-- ----------------------------
DROP TABLE IF EXISTS `divisions`;
CREATE TABLE `divisions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(220) NOT NULL,
  `uid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `divisions_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `universities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of divisions
-- ----------------------------
BEGIN;
INSERT INTO `divisions` (`id`, `name`, `uid`) VALUES (1, 'Division of Health, Engineering, Computing and Science', 1);
INSERT INTO `divisions` (`id`, `name`, `uid`) VALUES (2, 'Division of Education', 1);
COMMIT;

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `division_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exam_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of exam
-- ----------------------------
BEGIN;
INSERT INTO `exam` (`id`, `division_no`, `course_no`, `exam_no`, `create_by`, `create_date`, `modified_date`, `tags`, `status`, `questions`) VALUES (7, '1', 'GEOGY558', '112233', 'ChrisEames', '2023-10-06', NULL, 'CSS', 'Active', '[{\"questionNo\":\"Q001\",\"order\":\"1\",\"marks\":\"44\"},{\"questionNo\":\"Q233\",\"order\":\"2\",\"marks\":\"56\"},{\"questionNo\":\"122234\",\"order\":\"3\",\"marks\":\"0\"}]');
INSERT INTO `exam` (`id`, `division_no`, `course_no`, `exam_no`, `create_by`, `create_date`, `modified_date`, `tags`, `status`, `questions`) VALUES (9, '2', 'COMPX518', '1111111', 'ChrisEames', '2023-10-08', NULL, 'CSS', 'Active', '[{\"questionNo\":\"Q001\",\"order\":\"1\",\"marks\":\"22\"}]');
INSERT INTO `exam` (`id`, `division_no`, `course_no`, `exam_no`, `create_by`, `create_date`, `modified_date`, `tags`, `status`, `questions`) VALUES (10, '1', 'GEOGY558', '56666', 'ChrisEames', '2023-10-08', NULL, 'Web', 'Active', '[{\"questionNo\":\"Q001\",\"order\":\"1\",\"marks\":\"11\"}]');
INSERT INTO `exam` (`id`, `division_no`, `course_no`, `exam_no`, `create_by`, `create_date`, `modified_date`, `tags`, `status`, `questions`) VALUES (11, '1', 'GEOGY558', '123', 'ChrisEames', '2023-10-09', NULL, 'Web', 'Active', '[{\"questionNo\":\"Q001\",\"order\":\"1\",\"marks\":\"\"}]');
COMMIT;

-- ----------------------------
-- Table structure for exam_update_record
-- ----------------------------
DROP TABLE IF EXISTS `exam_update_record`;
CREATE TABLE `exam_update_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int DEFAULT NULL,
  `update_record` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of exam_update_record
-- ----------------------------
BEGIN;
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (1, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"100\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (2, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (3, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"7\\\",\\\"marks\\\":\\\"100\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (4, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"44\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (5, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"44\\\"},{\\\"questionNo\\\":\\\"Q233\\\",\\\"order\\\":\\\"2\\\",\\\"marks\\\":\\\"56\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (6, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"44\\\"},{\\\"questionNo\\\":\\\"Q233\\\",\\\"order\\\":\\\"2\\\",\\\"marks\\\":\\\"56\\\"},{\\\"questionNo\\\":\\\"122234\\\",\\\"order\\\":\\\"3\\\",\\\"marks\\\":\\\"0\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (7, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"44\\\"},{\\\"questionNo\\\":\\\"Q233\\\",\\\"order\\\":\\\"2\\\",\\\"marks\\\":\\\"56\\\"},{\\\"questionNo\\\":\\\"122234\\\",\\\"order\\\":\\\"3\\\",\\\"marks\\\":\\\"0\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (8, 9, '{\"course_no\":\"COMPX518\",\"exam_no\":\"1111111\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-08\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"22\\\"},{\\\"questionNo\\\":\\\"Q233\\\",\\\"order\\\":\\\"2\\\",\\\"marks\\\":\\\"11\\\"}]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (9, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[]\"}');
INSERT INTO `exam_update_record` (`id`, `exam_id`, `update_record`) VALUES (10, 7, '{\"course_no\":\"GEOGY558\",\"exam_no\":\"112233\",\"create_by\":\"ChrisEames\",\"create_date\":\"2023-10-06\",\"tags\":\"CSS\",\"status\":\"Active\",\"questions\":\"[{\\\"questionNo\\\":\\\"Q001\\\",\\\"order\\\":\\\"1\\\",\\\"marks\\\":\\\"44\\\"},{\\\"questionNo\\\":\\\"122234\\\",\\\"order\\\":\\\"3\\\",\\\"marks\\\":\\\"0\\\"}]\"}');
COMMIT;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `question_id` int NOT NULL,
  `question_name` varchar(255) DEFAULT NULL,
  `question_number` varchar(255) DEFAULT NULL,
  `question_status` enum('Ready','Pending') NOT NULL,
  `courses_id` int DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `modified_author` varchar(255) DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `time_estimate` int DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question
-- ----------------------------
BEGIN;
INSERT INTO `question` (`question_id`, `question_name`, `question_number`, `question_status`, `courses_id`, `create_time`, `modified_time`, `author`, `modified_author`, `grade`, `comment`, `tags`, `time_estimate`, `picture`) VALUES (1, 'Sample Question', 'Q001', 'Ready', 1, '2023-10-02 16:12:39', '2023-10-08 13:57:36', 'John Doe', 'ChrisEames', 1, 'No comments', '[\"sample\",\"CSS\"]', 10, 'http://localhost:3001/uploads/1696773448965-ceshi.jpeg');
INSERT INTO `question` (`question_id`, `question_name`, `question_number`, `question_status`, `courses_id`, `create_time`, `modified_time`, `author`, `modified_author`, `grade`, `comment`, `tags`, `time_estimate`, `picture`) VALUES (49244130, 'test', 'Q233', 'Ready', 1, '2023-10-08 14:40:18', '2023-10-08 14:41:24', 'ChrisEames', 'ChrisEames', 1, 'No comments', '[]', 10, 'http://localhost:3001/uploads/1696776052921-ceshi.jpeg');
INSERT INTO `question` (`question_id`, `question_name`, `question_number`, `question_status`, `courses_id`, `create_time`, `modified_time`, `author`, `modified_author`, `grade`, `comment`, `tags`, `time_estimate`, `picture`) VALUES (64845856, 'ggggg', '122234', 'Ready', 1, '2023-10-08 14:51:54', '2023-10-08 14:52:13', 'ChrisEames', 'ChrisEames', 1, 'No comments', '[]', 10, 'http://localhost:3001/uploads/1696776725677-ceshi.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for question_options
-- ----------------------------
DROP TABLE IF EXISTS `question_options`;
CREATE TABLE `question_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  `question_text` text,
  `options_order` varchar(255) NOT NULL,
  `option_text` varchar(255) NOT NULL,
  `question_type` enum('SingleChoice','MultiChoice','True-False') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question_options
-- ----------------------------
BEGIN;
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (1, 1, 1, 'This is a sample question. Select the correct option.', 'A', 'Option A', 'SingleChoice');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (2, 1, 1, 'This is a sample question. Select the correct option.', 'B', 'Option B', 'SingleChoice');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (3, 1, 1, 'This is a sample question. Select the correct option.', 'C', 'Option C', 'SingleChoice');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (4, 1, 1, 'This is a sample question. Select the correct option.', 'D', 'Option D', 'SingleChoice');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (5, 49244130, 77711938, 'Question Title test test test~~', 'A', 'Option A', 'True-False');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (6, 49244130, 77711938, 'Question Title test test test~~', 'B', 'Option B', 'True-False');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (7, 64845856, 9254413, 'Question Title', 'A', 'Option A', 'True-False');
INSERT INTO `question_options` (`id`, `question_id`, `group_id`, `question_text`, `options_order`, `option_text`, `question_type`) VALUES (8, 64845856, 9254413, 'Question Title', 'B', 'Option B', 'True-False');
COMMIT;

-- ----------------------------
-- Table structure for question_types
-- ----------------------------
DROP TABLE IF EXISTS `question_types`;
CREATE TABLE `question_types` (
  `id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `grade` int NOT NULL,
  `time_limite` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question_types
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
BEGIN;
INSERT INTO `tags` (`id`, `tags`) VALUES (1, 'CSS');
INSERT INTO `tags` (`id`, `tags`) VALUES (2, 'HTML');
INSERT INTO `tags` (`id`, `tags`) VALUES (3, 'JS');
INSERT INTO `tags` (`id`, `tags`) VALUES (4, 'sample');
COMMIT;

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `division_id` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `universities` (`id`),
  CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of teachers
-- ----------------------------
BEGIN;
INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `img`, `division_id`, `uid`) VALUES (1, 'Lars', 'Brabyn', '$2a$10$Ni5XwDeKVrtIfqpGDxXfRu70NzGF.2Patb3Xn/qaY7J5ipZfmE20a', 'lars.brabyn@waikato.ac.nz', '0221234567', NULL, 1, 1);
INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `img`, `division_id`, `uid`) VALUES (2, 'Vimal', 'Kumar', '$2a$10$CZWghuTvV5aFr3p.3NEQK.Z3ot0YA9o2eBXPMBxeJCqeiZNf8wvBO', 'vimal.kumar@waikato.ac.nz', '0221234568', NULL, 1, 1);
INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `img`, `division_id`, `uid`) VALUES (3, 'Chris', 'Eames', '$2a$10$s8VzGdBwBnFGEL/mLDhmpeR2h8JfBU1TeKQZaA/tHYftgNWYyCkze', 'chris.eames@waikato.ac.nz', '0221234569', NULL, 2, 1);
INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `password`, `email`, `mobile`, `img`, `division_id`, `uid`) VALUES (14, 'Edward', 'Lee', '$2a$10$rKguna3RgznLvwgS34bOM.TVK9BGCUI6G9mc/1U/nBkY41.vfJYwK', 'sl380@students.waikato.ac.nz', NULL, NULL, 2, 1);
COMMIT;

-- ----------------------------
-- Table structure for universities
-- ----------------------------
DROP TABLE IF EXISTS `universities`;
CREATE TABLE `universities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of universities
-- ----------------------------
BEGIN;
INSERT INTO `universities` (`id`, `name`) VALUES (1, 'UOW');
INSERT INTO `universities` (`id`, `name`) VALUES (2, 'UOA');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
