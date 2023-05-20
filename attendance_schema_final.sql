-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for attendance
CREATE DATABASE IF NOT EXISTS `attendance` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `attendance`;

-- Dumping structure for table attendance.attendances
CREATE TABLE IF NOT EXISTS `attendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

-- Dumping structure for table attendance.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `author` varchar(200) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `ddc_code` varchar(200) DEFAULT NULL,
  `item_code` varchar(200) DEFAULT NULL,
  `shelt_number` varchar(200) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `characteristic` varchar(50) DEFAULT NULL,
  `available_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT UC_Person UNIQUE (`ddc_code`,`item_code`)
);

-- Dumping structure for table attendance.book_department
CREATE TABLE IF NOT EXISTS `book_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_book` int(11) DEFAULT NULL,
  `id_department` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT UC_book_department UNIQUE (`id_book`,`id_department`)
);

-- Dumping structure for table attendance.candidates
CREATE TABLE IF NOT EXISTS `candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `namekh` varchar(250) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `candidatetype_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `departmentoption_id` int(11) DEFAULT NULL,
  `study_year` int(11) DEFAULT NULL,
  `departmentyear` varchar(50) DEFAULT NULL,
  `imageurl` varchar(250) DEFAULT NULL,
  `register_status` int(1) DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT UC_candidate UNIQUE (`student_id`)
);

-- Dumping structure for table attendance.candidate_type
CREATE TABLE IF NOT EXISTS `candidate_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT UC_candidate_type UNIQUE (`name`)
);

-- Dumping data for table attendance.candidate_type: ~4 rows (approximately)
/*!40000 ALTER TABLE `candidate_type` DISABLE KEYS */;
INSERT INTO `candidate_type` (`id`, `name`, `created`) VALUES
	(1, 'Ingénieure', '2023-02-20 23:19:09'),
	(2, 'Technique', '2023-02-21 21:07:58'),
	(3, 'Lecturer', '2023-02-21 21:10:37'),
	(4, 'Guest', '2023-02-21 21:14:16');
/*!40000 ALTER TABLE `candidate_type` ENABLE KEYS */;

-- Dumping structure for table attendance.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT UC_department UNIQUE (`name`)
);


-- Dumping structure for table attendance.department_options
CREATE TABLE IF NOT EXISTS `department_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_deparmentoption` (`department_id`),
  CONSTRAINT UC_department UNIQUE (`name`,`department_id`)
);

-- Dumping structure for table attendance.locations
CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT "",
  `description` text DEFAULT "",
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);

-- Dumping structure for table attendance.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(50),
  `create_at` date DEFAULT curdate(),
  `expire_at` date DEFAULT NULL,
  `expire_status` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT UC_department UNIQUE (`student_id`)
);

-- Dumping structure for table attendance.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL unique,
  `email` varchar(50) DEFAULT NULL unique,
  `password` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT UC_department UNIQUE (`email`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;;

-- Dumping data for table attendance.users: ~8 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
	(1, 'admin', 'admin@gmail.com', '$2a$10$I7/tjog3b4XLU8VItkB7IuKnHYTH5r182bn1B59qlXU17NaOoEYF.');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
