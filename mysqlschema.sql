
-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: gusac
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form` (
  `name` varchar(30) DEFAULT NULL,
  `college_name` varchar(30) DEFAULT NULL,
  `college_id` int(15) NOT NULL DEFAULT '0',
  `email` varchar(30) DEFAULT NULL,
  `dept` varchar(30) DEFAULT NULL,
  `passwd` blob,
  `confpwd` blob,
  `phone` int(10) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  UNIQUE KEY `college_name` (`college_name`,`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form`
--

LOCK TABLES `form` WRITE;
/*!40000 ALTER TABLE `form` DISABLE KEYS */;
/*!40000 ALTER TABLE `form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `update1form`
--

DROP TABLE IF EXISTS `update1form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `update1form` (
  `name` varchar(30) NOT NULL,
  `college_name` varchar(30) NOT NULL,
  `college_id` int(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `dept` varchar(30) NOT NULL,
  `passwd` blob NOT NULL,
  `confpwd` blob NOT NULL,
  `phone` int(10) NOT NULL,
  PRIMARY KEY (`college_id`),
  UNIQUE KEY `college_name` (`college_name`,`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `update1form`
--

LOCK TABLES `update1form` WRITE;
/*!40000 ALTER TABLE `update1form` DISABLE KEYS */;
INSERT INTO `update1form` VALUES ('akhil maddu','stanford',1210313333,'akhil.maddu021@gmail.com','cse','bangbang','bangbang',90),('akhil maddu','stanford',1210313334,'akhil.maddu021@gmail.com','cse','bangbang','bangbang',2147483647),('akhil maddu','stanford',2147483647,'akhil.maddu021@gmail.com','cse','!Ø§KæÑ÷\ZT\ÙcÂä','bangbang',2147483647);
/*!40000 ALTER TABLE `update1form` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-30 10:35:18
