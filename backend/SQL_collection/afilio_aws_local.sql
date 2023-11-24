-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: afilio
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `loginStatus` tinyint(1) NOT NULL DEFAULT '1',
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL DEFAULT '',
  `gender` char(10) NOT NULL DEFAULT '',
  `username` char(255) DEFAULT NULL,
  `dob` char(255) NOT NULL DEFAULT '',
  `phoneNumber` char(15) DEFAULT NULL,
  `email` char(255) DEFAULT NULL,
  `password` char(255) NOT NULL DEFAULT '',
  `reward` double NOT NULL DEFAULT '0',
  `subscription` char(20) NOT NULL DEFAULT 'pending',
  `otp_iat` varchar(255) NOT NULL DEFAULT '0',
  `otp_number` int DEFAULT NULL,
  `otp_status` tinyint(1) DEFAULT '0',
  `fcm_token` char(200) DEFAULT NULL,
  `refer_code` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `post_id` longtext,
  `item_id` longtext,
  `profile_id` bigint DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (0,4,'Parthiv Akbari','male','@admin','11/5/1990','9194451005','parth5097@gmail.com','$2b$15$CM453/NERnU.FvtcqSL7UuU/Fww9oRRwoXdr4nKC4wOVQCTo5CBZ6',0,'pending','1612953040922',679418,1,'website',NULL,NULL,NULL,1,1,'2021-02-10 10:30:40','2021-02-18 05:16:00'),(1,5,'Parth','male','deadMan','12/21/85','962431523','p@g.co','$2b$15$XGP2QsGLb3eIJdJ36FRnBunnFx5rC5FLfaXPdsTU82J2xgSl2d1dK',0,'pending','1612954186966',581668,1,'website',NULL,NULL,NULL,1,2,'2021-02-10 10:49:46','2021-02-18 08:16:36'),(0,6,'yagnik','Male','yagnikkat.','02/04/1991','9737754689','yagnikkat@yahoo.com','$2b$15$wOD5MHvl6/P8SG4sdWmcAO13YcbEppaBZ0NO35ZEuFhuSruqjMtna',0,'pending','1612954493185',498329,1,'deaTt8rHQv6G171x0WX5hB:APA91bHqrR_6eF8qRWj2HMk0IxoQfj3i8_bKsKhYuEheAYAuymVAKmGWIOYV8lbhWrb5BtuTFlrRltbdAmIsaCMWnCW7-P7ht0clgVdpGkWc0QW48saQpDqWnBTB5W7_yoeNq2ZcxZl1',NULL,NULL,'1',1,2,'2021-02-10 10:54:53','2021-02-18 08:15:03'),(0,7,'Siddharth','Male','sid_','02/01/1996','66548846388','Siddharth@gmail.com','$2b$15$ud34PGF/0fH1d7Jzflhmbu.93zQsUyv3Axyhx10hhm2n0ccp0DJFy',0,'pending','1613204974972',198263,1,'cN6F-1c-SSa3w1VQiKlufv:APA91bHagIht9_yfRCFfXVySkAnEOiDrmS_1OhgBMYVcVnfqHgb0WKdbcizOhTx30uv0KCrWhS7j1ZhRL1chRllioh-MDB3rctNqQRhW9vMPRR4zx9aHy7GTnMYelHGq2Ayy0MEZukMt','','',NULL,1,2,'2021-02-13 08:29:34','2021-02-18 05:16:00'),(1,8,'nobelive298','Male','nobelive298','05/30/2002','7041860041','nobelive298@gmail.com','$2b$10$uEmlQO7/5fhGJRO02HavcO5js3.iFBFshl9QNeJz1HySJeIbpso1m',0,'pending','1613378427764',236770,1,'ctIl1QE9RJCQNmNO3btadK:APA91bF1jrv5SJRnotx19LG0C2Ro_ydOJNMNy5OuG59YjcPAfHyPo5iC86GixdnUMpN0TGIni0d9ZQ_NkQtP8RqMfkomMBPRlXdUSKEtfse5JOv9Z8mexHR1O2z7DV8xzPrPF8xIGSaC','','1,4',NULL,18,2,'2021-02-15 08:40:27','2021-02-18 08:18:27'),(0,11,'login','Male','login data298','05/30/2002','9824464240','logindata298@gmail.com','$2b$15$/kh5ye2fvQOydPp5lXk6t.TyPd/oNTxA8vww1Y71bpz6jbL8imeoW',0,'pending','1613379563287',611532,1,NULL,'',NULL,NULL,1,2,'2021-02-15 08:59:23','2021-02-18 05:16:00');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `img` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Amzon','/upload_images/brand/247751323801_afilio.jpg'),(2,'Myntra','/upload_images/brand/344838364933_afilio.jpg'),(3,'Flipkart','/upload_images/brand/244715505601_afilio.jpg'),(4,'Zara','/upload_images/brand/331404704988_afilio.jpg'),(5,'Calvin clein','/upload_images/brand/769848853817_afilio.jpg'),(6,'Safari','/upload_images/brand/210186527691_afilio.jpg');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` char(100) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `img` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,NULL,'Jins','/upload_images/category/413969565690_afilio.jpg'),(2,NULL,'Tshirt','/upload_images/category/323762724738_afilio.jpg'),(3,NULL,'Tops','/upload_images/category/333374944742_afilio.jpg'),(4,NULL,'Kurtis','/upload_images/category/807298378472_afilio.jpg'),(5,NULL,'Westorn Wear','/upload_images/category/289477332868_afilio.jpg'),(6,NULL,'Pyjamas','/upload_images/category/583521331814_afilio.jpg'),(7,NULL,'Blazers','/upload_images/category/626524191673_afilio.jpg'),(8,NULL,'Shoes','/upload_images/category/638547929398_afilio.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `col_name` char(100) NOT NULL,
  `data` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (1,7,'All Posts','','2021-02-13 09:00:54'),(2,8,'All Posts','','2021-02-16 10:53:16'),(3,8,'All Posts','','2021-02-16 10:53:19'),(4,8,'All Posts','','2021-02-16 10:53:22'),(5,8,'All Posts','','2021-02-17 06:44:23'),(6,8,'All Posts','','2021-02-17 11:14:23'),(7,8,'','6','2021-02-17 11:14:33'),(8,8,'All Posts','','2021-02-17 11:14:35'),(9,8,'All Posts','','2021-02-17 11:14:36'),(10,8,'All Posts','','2021-02-17 11:14:43'),(11,8,'All Posts','','2021-02-17 11:14:48'),(12,8,'All Posts','','2021-02-17 11:14:50'),(13,8,'All Posts','','2021-02-17 11:14:57'),(14,8,'All Posts','','2021-02-17 11:19:34');
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `img` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'Red','/upload_images/color/748302375128_afilio.jpg'),(2,'Green','/upload_images/color/704433124687_afilio.jpg'),(3,'Black','/upload_images/color/588957004135_afilio.jpg'),(4,'White','/upload_images/color/262116796060_afilio.jpg'),(5,'Grey','/upload_images/color/163385074565_afilio.jpg'),(6,'Blue','/upload_images/color/974720584389_afilio.jpg');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `msg` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `likes` bigint NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (8,1,6,'nice product',NULL,0,'2021-02-10 13:23:38'),(9,1,6,'Great',NULL,0,'2021-02-11 10:29:39'),(10,1,8,'great',NULL,0,'2021-02-16 10:05:47'),(11,7,8,'qqqqw',NULL,0,'2021-02-16 12:23:33'),(12,7,8,'good',NULL,0,'2021-02-16 12:23:47'),(13,7,8,'v g',NULL,0,'2021-02-16 12:23:52'),(14,7,6,'Nice Suit',NULL,0,'2021-02-16 12:58:39'),(15,1,8,'h',NULL,0,'2021-02-17 06:49:59'),(16,4,8,'good',NULL,0,'2021-02-17 06:50:13'),(17,1,8,'g',NULL,0,'2021-02-17 08:26:41'),(18,4,8,'good',NULL,0,'2021-02-17 08:26:54');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follower` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `f_id` bigint NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower`
--

LOCK TABLES `follower` WRITE;
/*!40000 ALTER TABLE `follower` DISABLE KEYS */;
INSERT INTO `follower` VALUES (27,5,7,'2021-02-13 10:30:45'),(29,6,7,'2021-02-13 12:22:53'),(32,6,5,'2021-02-16 06:06:17'),(34,5,8,'2021-02-16 07:07:47'),(39,6,8,'2021-02-16 10:40:45'),(40,8,6,'2021-02-16 12:59:12');
/*!40000 ALTER TABLE `follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `following`
--

DROP TABLE IF EXISTS `following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `following` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `f_id` bigint NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `following`
--

LOCK TABLES `following` WRITE;
/*!40000 ALTER TABLE `following` DISABLE KEYS */;
INSERT INTO `following` VALUES (38,7,5,'2021-02-13 10:30:45'),(42,7,6,'2021-02-13 12:22:53'),(45,5,6,'2021-02-16 06:06:17'),(47,8,5,'2021-02-16 07:07:47'),(52,8,6,'2021-02-16 10:40:45'),(53,6,8,'2021-02-16 12:59:12');
/*!40000 ALTER TABLE `following` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` char(150) NOT NULL,
  `countPost` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'#Zara',5),(2,'#Shirts',5),(3,'#Tshirts',5),(9,'',3);
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_data_history`
--

DROP TABLE IF EXISTS `item_data_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_data_history` (
  `id` char(100) NOT NULL,
  `user_id` char(50) NOT NULL,
  `clicks` bigint NOT NULL DEFAULT '0',
  `action` varchar(50) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_data_history`
--

LOCK TABLES `item_data_history` WRITE;
/*!40000 ALTER TABLE `item_data_history` DISABLE KEYS */;
INSERT INTO `item_data_history` VALUES ('1','6',0,'update','2021-02-13 09:01:22'),('2','6',0,'update','2021-02-13 09:01:23'),('1','6',0,'update','2021-02-13 09:04:56'),('2','6',0,'update','2021-02-13 09:04:56');
/*!40000 ALTER TABLE `item_data_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `name` char(50) NOT NULL,
  `image` longtext NOT NULL,
  `category_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  `gender` char(10) DEFAULT NULL,
  `description` text,
  `price` bigint DEFAULT NULL,
  `link` char(200) NOT NULL,
  `clicks` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,6,'kaipan','/upload_images/item/501181140739_sample.jpg,/upload_images/item/663736479750_9.PNG',2,6,1,1,'male','jcndsknujdcsjncdksncndjsnjck',50,'http://www.google.com',0,'2021-02-10 11:24:14','2021-02-13 09:04:56'),(2,6,'White Coat','/upload_images/item/854346989238_zaraone.webp',2,1,1,1,'male','Zara brand new White coat',10000,'http://www.zara.com',0,'2021-02-10 11:29:03','2021-02-13 09:04:56');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_post`
--

DROP TABLE IF EXISTS `like_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `isLiked` tinyint(1) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_post`
--

LOCK TABLES `like_post` WRITE;
/*!40000 ALTER TABLE `like_post` DISABLE KEYS */;
INSERT INTO `like_post` VALUES (1,4,7,1,'2021-02-13 09:00:52'),(2,5,7,1,'2021-02-13 09:01:59'),(3,1,7,1,'2021-02-13 09:02:29'),(4,1,8,0,'2021-02-16 05:13:59'),(5,5,8,0,'2021-02-16 05:36:35'),(6,6,8,0,'2021-02-16 06:33:27'),(7,3,8,0,'2021-02-16 09:58:33'),(8,1,6,1,'2021-02-16 10:56:19'),(9,4,8,0,'2021-02-16 11:20:00'),(10,7,8,0,'2021-02-16 12:13:30'),(11,7,6,1,'2021-02-16 12:58:18'),(12,4,6,1,'2021-02-16 13:07:50'),(13,5,6,1,'2021-02-16 13:07:52');
/*!40000 ALTER TABLE `like_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_role_req`
--

DROP TABLE IF EXISTS `new_role_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_role_req` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` char(50) NOT NULL,
  `role` char(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_role_req`
--

LOCK TABLES `new_role_req` WRITE;
/*!40000 ALTER TABLE `new_role_req` DISABLE KEYS */;
INSERT INTO `new_role_req` VALUES (1,'deadman','influencer','pending','2021-02-16 05:56:21');
/*!40000 ALTER TABLE `new_role_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` longtext NOT NULL,
  `description` text NOT NULL,
  `likes` bigint NOT NULL DEFAULT '0',
  `share` int NOT NULL DEFAULT '0',
  `hashtag` text NOT NULL,
  `item_id` text NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` bigint NOT NULL,
  `savePost` bigint DEFAULT '0',
  `commentPost` bigint NOT NULL DEFAULT '0',
  `tagBrand` text NOT NULL,
  `region` char(50) NOT NULL DEFAULT 'IN',
  `height` int NOT NULL DEFAULT '0',
  `width` int NOT NULL DEFAULT '0',
  `reach` bigint NOT NULL DEFAULT '0',
  `impression` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'/upload_images/post/106663451285_1612960545140.png','Zara ',2,0,'#Zara #Shirts #Tshirts','2','[{\"id\":\"2\",\"name\":\"White Coat\",\"offset\":\"146.54545454545453,146.54545454545453\"}]',6,0,6,'','IN',2186,1179,3,0,'2021-02-10 12:37:21','2021-02-17 10:33:36'),(2,'/upload_images/post/223728548445_1612962287560.png','#Zara #Shirts #Tshirts',0,0,'#Zara #Shirts #Tshirts','2,1','[{\"id\":\"2\",\"name\":\"White Coat\",\"offset\":\"217.45454545454547,217.45454545454547\"},{\"id\":\"1\",\"name\":\"kaipan\",\"offset\":\"188.72727272727272,188.72727272727272\"}]',6,0,0,'','IN',2186,1179,3,0,'2021-02-10 13:05:19','2021-02-17 10:33:36'),(3,'/upload_images/post/185991949850_sample.jpg','ibcjdusihfjidsc kjdbsjkcds',0,0,'#Zara #Shirts #Tshirts','2,1','[{\"id\":\"2944acda-9772-4451-a652-c60df5b20558\",\"name\":\"kaipan\",\"offset\":\"125\"},{\"id\":\"533fa030-a0f6-4b4c-8ad5-a475515508c8\",\"name\":\"kaipan\",\"offset\":\"125\"}]',5,0,0,'@zara,@kk','IN',100,100,0,0,'2021-02-10 13:13:37','2021-02-16 09:58:35'),(4,'/upload_images/post/809981376418_7.PNG','ibcjdusihfjidsc kjdbsjkcds',2,0,'#Zara #Shirts #Tshirts','2,1','[{\"id\":\"2944acda-9772-4451-a652-c60df5b20558\",\"name\":\"kaipan\",\"offset\":\"125\"},{\"id\":\"533fa030-a0f6-4b4c-8ad5-a475515508c8\",\"name\":\"kaipan\",\"offset\":\"125\"}]',5,1,2,'@zara,@kk','IN',100,100,0,0,'2021-02-10 13:14:36','2021-02-17 11:14:56'),(5,'/upload_images/post/437796138712_file_example_MP4_480_1_5MG.mp4','ibcjdusihfjidsc kjdbsjkcds',2,0,'#Zara #Shirts #Tshirts','1','[{\"id\":\"2944acda-9772-4451-a652-c60df5b20558\",\"name\":\"kaipan\",\"offset\":\"125\"},{\"id\":\"533fa030-a0f6-4b4c-8ad5-a475515508c8\",\"name\":\"kaipan\",\"offset\":\"125\"}]',5,2,0,'@zara,@kk','IN',100,100,0,0,'2021-02-10 13:25:47','2021-02-17 11:14:48'),(6,'/upload_images/post/661881281316_result.mp4','',0,0,'',' ',' ',8,1,0,'','IN',1000,1000,0,0,'2021-02-16 06:28:32','2021-02-17 11:19:34'),(7,'/upload_images/post/110640306499_1613473261418.png','#',1,0,'#','1,2','[{\"id\":\"1\",\"name\":\"kaipan\",\"offset\":\"251.0,251.0\"},{\"id\":\"2\",\"name\":\"White Coat\",\"offset\":\"162.5,162.5\"}]',8,1,4,'','IN',2028,1080,0,0,'2021-02-16 11:03:35','2021-02-17 12:25:01');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_data_history`
--

DROP TABLE IF EXISTS `post_data_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_data_history` (
  `id` char(50) NOT NULL,
  `likes` bigint NOT NULL DEFAULT '0',
  `share` int NOT NULL DEFAULT '0',
  `user_id` char(50) NOT NULL,
  `savePost` bigint DEFAULT '0',
  `commentPost` bigint NOT NULL DEFAULT '0',
  `reach` bigint NOT NULL DEFAULT '0',
  `impression` bigint NOT NULL DEFAULT '0',
  `action` char(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_data_history`
--

LOCK TABLES `post_data_history` WRITE;
/*!40000 ALTER TABLE `post_data_history` DISABLE KEYS */;
INSERT INTO `post_data_history` VALUES ('1',0,0,'6',0,0,0,0,'update','2021-02-10 13:21:47'),('1',0,0,'6',0,1,0,0,'update','2021-02-10 13:23:38'),('3',0,0,'5',0,0,0,0,'update','2021-02-10 13:27:02'),('4',0,0,'5',0,0,0,0,'update','2021-02-10 13:27:02'),('5',0,0,'5',0,0,0,0,'update','2021-02-10 13:27:02'),('3',0,0,'5',0,0,0,0,'update','2021-02-11 04:47:09'),('4',0,0,'5',0,0,0,0,'update','2021-02-11 04:47:09'),('5',0,0,'5',0,0,0,0,'update','2021-02-11 04:47:09'),('1',0,0,'6',0,2,0,0,'update','2021-02-11 04:47:10'),('4',0,0,'5',0,0,0,0,'update','2021-02-11 05:10:58'),('3',0,0,'5',0,0,0,0,'update','2021-02-11 05:10:58'),('1',0,0,'6',0,2,0,0,'update','2021-02-11 10:29:39'),('4',0,0,'5',0,0,0,0,'update','2021-02-13 09:00:52'),('4',1,0,'5',0,0,0,0,'update','2021-02-13 09:01:50'),('4',0,0,'5',0,0,0,0,'update','2021-02-13 09:01:51'),('5',0,0,'5',0,0,0,0,'update','2021-02-13 09:01:59'),('1',0,0,'6',0,3,0,0,'update','2021-02-13 09:02:29'),('1',1,0,'6',0,3,0,0,'update','2021-02-13 09:02:31'),('1',0,0,'6',0,3,0,0,'update','2021-02-13 09:02:32'),('1',1,0,'6',0,3,0,0,'update','2021-02-13 09:02:33'),('1',0,0,'6',0,3,0,0,'update','2021-02-13 09:02:35'),('1',1,0,'6',0,3,0,0,'update','2021-02-16 05:13:59'),('1',2,0,'6',0,3,0,0,'update','2021-02-16 05:14:00'),('1',1,0,'6',0,3,0,0,'update','2021-02-16 05:14:13'),('1',2,0,'6',0,3,0,0,'update','2021-02-16 05:14:14'),('5',1,0,'5',0,0,0,0,'update','2021-02-16 05:36:35'),('5',2,0,'5',0,0,0,0,'update','2021-02-16 05:36:36'),('6',0,0,'8',0,0,0,0,'update','2021-02-16 06:33:27'),('6',1,0,'8',0,0,0,0,'update','2021-02-16 06:33:33'),('6',0,0,'8',0,0,0,0,'update','2021-02-16 06:33:34'),('6',1,0,'8',0,0,0,0,'update','2021-02-16 06:33:35'),('6',0,0,'8',0,0,0,0,'update','2021-02-16 06:33:39'),('6',1,0,'8',0,0,0,0,'update','2021-02-16 06:33:41'),('6',0,0,'8',0,0,0,0,'update','2021-02-16 06:33:42'),('6',1,0,'8',0,0,0,0,'update','2021-02-16 06:33:43'),('6',0,0,'8',0,0,0,0,'update','2021-02-16 06:33:50'),('6',1,0,'8',0,0,0,0,'update','2021-02-16 06:33:54'),('5',1,0,'5',0,0,0,0,'update','2021-02-16 06:38:05'),('5',1,0,'5',0,0,0,0,'update','2021-02-16 06:52:47'),('5',2,0,'5',0,0,0,0,'update','2021-02-16 06:53:04'),('3',0,0,'5',0,0,0,0,'update','2021-02-16 09:58:33'),('3',1,0,'5',0,0,0,0,'update','2021-02-16 09:58:35'),('1',1,0,'6',0,3,0,0,'update','2021-02-16 10:05:47'),('1',1,0,'6',0,4,0,0,'update','2021-02-16 10:56:19'),('4',1,0,'5',0,0,0,0,'update','2021-02-16 11:20:00'),('4',2,0,'5',0,0,0,0,'update','2021-02-16 11:20:01'),('7',0,0,'8',0,0,0,0,'update','2021-02-16 12:13:30'),('7',1,0,'8',0,0,0,0,'update','2021-02-16 12:22:57'),('7',0,0,'8',0,0,0,0,'update','2021-02-16 12:23:18'),('7',1,0,'8',0,0,0,0,'update','2021-02-16 12:23:33'),('7',1,0,'8',0,1,0,0,'update','2021-02-16 12:23:47'),('7',1,0,'8',0,2,0,0,'update','2021-02-16 12:23:52'),('7',1,0,'8',0,3,0,0,'update','2021-02-16 12:58:18'),('7',2,0,'8',0,3,0,0,'update','2021-02-16 12:58:39'),('4',1,0,'5',0,0,0,0,'update','2021-02-16 13:07:50'),('5',1,0,'5',0,0,0,0,'update','2021-02-16 13:07:52'),('1',2,0,'6',0,4,0,0,'update','2021-02-17 06:49:59'),('4',2,0,'5',0,0,0,0,'update','2021-02-17 06:50:13'),('5',2,0,'5',0,0,0,0,'update','2021-02-17 07:05:52'),('5',3,0,'5',0,0,0,0,'update','2021-02-17 07:05:56'),('5',2,0,'5',0,0,0,0,'update','2021-02-17 07:05:56'),('5',3,0,'5',0,0,0,0,'update','2021-02-17 07:05:57'),('5',2,0,'5',0,0,0,0,'update','2021-02-17 07:05:59'),('5',3,0,'5',0,0,0,0,'update','2021-02-17 07:06:01'),('5',2,0,'5',0,0,0,0,'update','2021-02-17 07:06:04'),('5',3,0,'5',0,0,0,0,'update','2021-02-17 07:06:06'),('6',0,0,'8',0,0,0,0,'update','2021-02-17 07:17:33'),('6',1,0,'8',0,0,0,0,'update','2021-02-17 07:17:34'),('6',0,0,'8',0,0,0,0,'update','2021-02-17 07:17:35'),('6',1,0,'8',0,0,0,0,'update','2021-02-17 07:17:35'),('1',2,0,'6',0,5,0,0,'update','2021-02-17 08:26:41'),('4',2,0,'5',0,1,0,0,'update','2021-02-17 08:26:54'),('1',2,0,'6',0,6,0,0,'update','2021-02-17 10:14:43'),('2',0,0,'6',0,0,0,0,'update','2021-02-17 10:14:43'),('1',2,0,'6',0,6,1,0,'update','2021-02-17 10:16:13'),('2',0,0,'6',0,0,1,0,'update','2021-02-17 10:16:13'),('1',2,0,'6',0,6,2,0,'update','2021-02-17 10:33:36'),('2',0,0,'6',0,0,2,0,'update','2021-02-17 10:33:36'),('5',2,0,'5',0,0,0,0,'update','2021-02-17 11:14:43'),('5',2,0,'5',1,0,0,0,'update','2021-02-17 11:14:48'),('7',2,0,'8',0,4,0,0,'update','2021-02-17 11:14:50'),('4',2,0,'5',0,2,0,0,'update','2021-02-17 11:14:56'),('6',0,0,'8',0,0,0,0,'update','2021-02-17 11:19:34'),('7',2,0,'8',1,4,0,0,'update','2021-02-17 12:24:58'),('7',1,0,'8',1,4,0,0,'update','2021-02-17 12:24:58'),('7',1,0,'8',1,4,0,0,'update','2021-02-17 12:24:59'),('7',2,0,'8',1,4,0,0,'update','2021-02-17 12:25:01');
/*!40000 ALTER TABLE `post_data_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `review` double NOT NULL DEFAULT '0',
  `reviewSum` double DEFAULT '0',
  `reviewCount` int DEFAULT '0',
  `bio` text NOT NULL,
  `background_img` text NOT NULL,
  `profile_pic_img` text NOT NULL,
  `sh_instagram` text NOT NULL,
  `sh_facebook` text NOT NULL,
  `sh_tiktok` text NOT NULL,
  `sh_twitter` text NOT NULL,
  `sh_youtube` text NOT NULL,
  `sh_website` text NOT NULL,
  `visit` bigint NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,5,10,2,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','/upload_images/defaultProfile/profile.jpg','','','','','','',260,'2021-02-10 10:20:29'),(5,0,0,0,'','/upload_images/profile/367217427532_sample.jpg','/upload_images/profile/954477411817_afilio.jpeg','','','','','','',4,'2021-02-13 12:33:34'),(6,0,0,0,'','/upload_images/profile/960681377115_image_cropper_1613364350163.jpg','/upload_images/profile/761372211572_image_cropper_1613220659490.jpg','','','','','','',5,'2021-02-13 12:49:33'),(7,0,0,0,'','/upload_images/profile/455697233577_sample.jpg','/upload_images/profile/854691667054_afilio.jpeg','','','','','','',125,'2021-02-15 13:17:51'),(8,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616058456&hash=AeQuKZ16lUlmq8NPtg0','','','','','','',0,'2021-02-16 09:07:36'),(9,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616059825&hash=AeSw9EEOwBgHuiU-vuw','','','','','','',0,'2021-02-16 09:30:52'),(10,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616059869&hash=AeTwVUs2sexSVoBDouI','','','','','','',0,'2021-02-16 09:31:15'),(11,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616060171&hash=AeQyFQ0wzvPZ84g2wHI','','','','','','',0,'2021-02-16 09:36:22'),(12,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616060191&hash=AeSMHtRg_8xbaQZ1SWE','','','','','','',0,'2021-02-16 09:36:35'),(13,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616060254&hash=AeSCpuuMFfMp3ErLgk0','','','','','','',0,'2021-02-16 09:37:37'),(14,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616060263&hash=AeRDs1WiNg-IDNuiebs','','','','','','',0,'2021-02-16 09:37:46'),(15,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1615112605&hash=AeT-RVH6qqTQJgJTaOI','','','','','','',0,'2021-02-16 09:46:01'),(16,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616060849&hash=AeTV99sP8ywnxC43slY','','','','','','',0,'2021-02-16 09:47:35'),(17,0,0,0,'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3504759192903126&height=800&width=800&ext=1616060865&hash=AeS2UtzjjaqCO1J6Eb0','','','','','','',0,'2021-02-16 09:47:49'),(18,0,0,0,'ormal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','/upload_images/defaultProfile/background.jpg','/upload_images/profile/344827710188_image_cropper_1613470896765.jpg','','gautam','','','','',42,'2021-02-16 10:21:43');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refer`
--

DROP TABLE IF EXISTS `refer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `refer_code` char(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `refer_code` (`refer_code`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refer`
--

LOCK TABLES `refer` WRITE;
/*!40000 ALTER TABLE `refer` DISABLE KEYS */;
INSERT INTO `refer` VALUES (21,4,'632e948c'),(22,5,'b2685e9f'),(27,6,'67d3f7af'),(71,7,'9aa0a9b1'),(92,8,'74827d63'),(98,11,'19622bb0');
/*!40000 ALTER TABLE `refer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `p_id` bigint NOT NULL,
  `u_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,6),(2,1,5);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'influencer'),(3,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_post`
--

DROP TABLE IF EXISTS `share_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_post`
--

LOCK TABLES `share_post` WRITE;
/*!40000 ALTER TABLE `share_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `share_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_option`
--

DROP TABLE IF EXISTS `shipping_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_option` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_option`
--

LOCK TABLES `shipping_option` WRITE;
/*!40000 ALTER TABLE `shipping_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `item_condition` text,
  `img` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'S',NULL,'/upload_images/size/830460158619_afilio.jpg'),(2,'M',NULL,'/upload_images/size/852922879635_afilio.jpg'),(3,'L',NULL,'/upload_images/size/434146088274_afilio.jpg'),(4,'XL',NULL,'/upload_images/size/261787806464_afilio.jpg'),(5,'XXL',NULL,'/upload_images/size/934373491965_afilio.jpg'),(6,'XXXL',NULL,'/upload_images/size/472991811648_afilio.jpg');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactional_feedback`
--

DROP TABLE IF EXISTS `transactional_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactional_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` char(20) NOT NULL,
  `body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `transactional_feedback_chk_1` CHECK (json_valid(`body`))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactional_feedback`
--

LOCK TABLES `transactional_feedback` WRITE;
/*!40000 ALTER TABLE `transactional_feedback` DISABLE KEYS */;
INSERT INTO `transactional_feedback` VALUES (1,'yagnikkat@yahoo.com','{\"email\":\"yagnikkat@yahoo.com\",\"subject\":\"Demo\",\"message\":\"nice very good Application and very weel build no issue regarding app. The Feeed back is for test\"}'),(2,'yagnikkat@yahoo.com','{\"email\":\"yagnikkat@yahoo.com\",\"subject\":\"very good\",\"message\":\"nice application , very good build , user-friendly nice application , very good build , user-friendly ,nice application , very good build , user-friendly nice application , very good build , user-friendly \"}'),(3,'yagnikkat@yahoo.com','{\"email\":\"yagnikkat@yahoo.com\",\"subject\":\"very good\",\"message\":\"nice application , very good build , user-friendly nice application , very good build , user-friendly ,nice application , very good build , user-friendly nice application , very good build , user-friendly \"}'),(4,'yagnikkat@yahoo.com','{\"email\":\"yagnikkat@yahoo.com\",\"subject\":\"very good\",\"message\":\"nice application , very good build , user-friendly nice application , very good build , user-friendly ,nice application , very good build , user-friendly nice application , very good build , user-friendly \"}'),(5,'yagnikkat@yahoo.com','{\"email\":\"yagnikkat@yahoo.com\",\"subject\":\"very good\",\"message\":\"nice application , very good build , user-friendly nice application , very good build , user-friendly ,nice application , very good build , user-friendly nice application , very good build , user-friendly \"}');
/*!40000 ALTER TABLE `transactional_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactional_image`
--

DROP TABLE IF EXISTS `transactional_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactional_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `path` char(100) DEFAULT NULL,
  `img_name` char(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactional_image`
--

LOCK TABLES `transactional_image` WRITE;
/*!40000 ALTER TABLE `transactional_image` DISABLE KEYS */;
INSERT INTO `transactional_image` VALUES (1,NULL,'/upload_images/item/','501181140739_sample.jpg','2021-02-10 11:24:14'),(2,NULL,'/upload_images/item/','663736479750_9.PNG','2021-02-10 11:24:14'),(3,NULL,'/upload_images/item/','854346989238_zaraone.webp','2021-02-10 11:29:03'),(4,NULL,'/upload_images/post/','106663451285_1612960545140.png','2021-02-10 12:37:21'),(5,NULL,'/upload_images/post/','223728548445_1612962287560.png','2021-02-10 13:05:19'),(6,NULL,'/upload_images/post/','185991949850_sample.jpg','2021-02-10 13:13:37'),(7,NULL,'/upload_images/post/','883607356385_download.mp4','2021-02-10 13:13:37'),(8,NULL,'/upload_images/post/','809981376418_7.PNG','2021-02-10 13:14:36'),(9,NULL,'/upload_images/post/','892633422158_download.mp4','2021-02-10 13:14:36'),(10,NULL,'/upload_images/post/','719178713775_7.PNG','2021-02-10 13:25:47'),(11,NULL,'/upload_images/post/','437796138712_file_example_MP4_480_1_5MG.mp4','2021-02-10 13:25:47'),(12,NULL,'/upload_images/post/','661881281316_result.mp4','2021-02-16 06:28:32'),(13,NULL,'/upload_images/post/','110640306499_1613473261418.png','2021-02-16 11:03:35');
/*!40000 ALTER TABLE `transactional_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactional_payments`
--

DROP TABLE IF EXISTS `transactional_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactional_payments` (
  `order_id` char(100) NOT NULL,
  `payment_id` char(100) NOT NULL,
  `payment_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_verification` char(50) NOT NULL,
  `payment_object` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `payment_id` (`payment_id`),
  UNIQUE KEY `order_id` (`order_id`),
  CONSTRAINT `transactional_payments_chk_1` CHECK (json_valid(`payment_object`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactional_payments`
--

LOCK TABLES `transactional_payments` WRITE;
/*!40000 ALTER TABLE `transactional_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactional_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactional_scrap_img`
--

DROP TABLE IF EXISTS `transactional_scrap_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactional_scrap_img` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text,
  `img` longtext NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactional_scrap_img`
--

LOCK TABLES `transactional_scrap_img` WRITE;
/*!40000 ALTER TABLE `transactional_scrap_img` DISABLE KEYS */;
INSERT INTO `transactional_scrap_img` VALUES (14,'https://www.flipkart.com/apple-iphone-se-black-64-gb-includes-earpods-power-adapter/p/itm832dd5963a08d?pid=MOBFRFXHCKWDAC4A&lid=LSTMOBFRFXHCKWDAC4AEQROVZ&marketplace=FLIPKART&srno=b_1_1&otracker=clp_banner_1_15.bannerX3.BANNER_mobile-phones-store_P9D3NGEGRAGT&fm=neo%2Fmerchandising&iid=86322529-c357-4c0f-aede-d16702a321a1.MOBFRFXHCKWDAC4A.SEARCH&ppt=clp&ppn=mobile-phones-store&ssid=2t43pcyif40000001613194641104','{\"productName\":\"iPhone SE ( 64 GB Storage) Online at Best Price On Flipkart.com\",\"productImage\":[\"https://rukminim1.flixcart.com/image/352/352/k9loccw0/mobile/p/z/q/apple-iphone-se-mxd02hn-a-original-imafrcpjfehbbqgb.jpeg?q=70\",\"https://rukminim1.flixcart.com/image/704/704/k9loccw0/mobile/p/z/q/apple-iphone-se-mxd02hn-a-original-imafrcpjfehbbqgb.jpeg?q=70\",\"https://rukminim1.flixcart.com/image/352/352/k9loccw0/mobile/p/z/q/apple-iphone-se-mxd02hn-a-original-imafrcpjfehbbqgb.jpeg?q=70\",\"https://rukminim1.flixcart.com/image/160/160/prod-fk-cms-brand-images/9d5696196cfb3f4440ca99b1018c8ff91a53716d1948ba73ee3bb68f36571d7a.jpg?q=90\",\"https://rukminim1.flixcart.com/image/144/144/k9loccw0/mobile/p/z/q/apple-iphone-se-mxd02hn-a-original-imafrcpjfehbbqgb.jpeg?q=50\",\"https://rukminim1.flixcart.com/image/144/144/k9loccw0/mobile/6/8/g/apple-iphone-se-mxvv2hn-a-original-imafrcqmfxhcrpsb.jpeg?q=50\",\"https://rukminim1.flixcart.com/image/144/144/k9loccw0/mobile/6/b/z/apple-iphone-se-mxd12hn-a-original-imafrcqfsuzwa3dz.jpeg?q=50\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/d93be1a956f14398a7a670b5ecc85f18_172137ba22e_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/8dc8700bc4ba439494f02e8d6d9be0ea_172137bbd4c_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/39e2296a138543d3be16a1d97258f805_172137bd94b_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/02573821970340bdab793f09301e643f_172137c035d_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/cb9e86a3231d466fb95d0dc53a7b9135_172137c192e_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/178c73cdb89c414f88bbcc6b72d20a96_172137c38fe_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/729ef40a67a245dd8377c880b0595ede_1721790ecdf_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/84eb02d9f36f4cf58d9d40be60d472c6_1721791110f_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/188fa2d9c89b448da29bd5ab05464784_17217912ba0_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/3b295a76bf144ac8897f470b47f39f61_17217915400_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/5afe5bd6dddc41d0b75fe67a73d18016_17217916cc9_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/cd880f453cbe417d8192c0cb9f3e0536_17217918efc_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/10482fbd21f9402ab3f214b611986dfd_1721791b094_image.jpeg?q=90\",\"https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/416548698c394ce48430dba9ad597862_1721791cd27_image.jpeg?q=90\"],\"productPrice\":[\"₹34,999\",\"₹34,999\",\"₹170\",\"₹189\"]}','2021-02-13 05:54:32');
/*!40000 ALTER TABLE `transactional_scrap_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactional_token_blacklist`
--

DROP TABLE IF EXISTS `transactional_token_blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactional_token_blacklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` text NOT NULL,
  `false_attempt` int NOT NULL DEFAULT '0',
  `block` tinyint(1) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactional_token_blacklist`
--

LOCK TABLES `transactional_token_blacklist` WRITE;
/*!40000 ALTER TABLE `transactional_token_blacklist` DISABLE KEYS */;
INSERT INTO `transactional_token_blacklist` VALUES (1,5,'a5F0l9Y79JCVXpkI6ICc5RnIsIiN1IzUIJiOicGbhJyea5F0l9Y7.a5F0l9Y7Qf2kTM2MjNzEjNxojI0FWaiwiIlRXazJWZ3JiOi4WZr9Gdf12YmJCLiIXZj5WZ1xmZulmI6ISZs9mciwSN6ICZpJyea5F0l9Y7.a5F0l9Y78Fta7d1T8OAzqwRjevA0D-J-1l0d59VPB9SjXFmmGs2a5F0l9Y7',0,0,'2021-02-18 08:16:36'),(2,8,'a5F0l9Y79JCVXpkI6ICc5RnIsIiN1IzUIJiOicGbhJyea5F0l9Y7.a5F0l9Y7Qf3AzM2MjNzEjNxojI0FWaiwiIDF2UHlEe4YEUyBle4hjVEdjey8UMShEel1GOaljdPpUNlNnZ0V0STVFZYxmUQJUTt92am1UcShDU0F1aO9VUalDZwkmbJdEVw4EcNVlbkhXaHZDODlWNvBVeIZWQQNmaZlTNHV3T1knTN5kSPRWef9mUyMEMHxUOxgHdv5mUKNVN2JnaxYkYxkTQQFkOLRWY0J2MP5UbOF1QKJVOFFVMslEdjJiOi4WZr9Gdf12YmJCLiIXZj5WZ1xmZulmI6ISZs9mciwCO6ICZpJyea5F0l9Y7.a5F0l9Y7IibH-omd8-1v3s2kliWqUmiJqG2_AF4Q1QRFinX3vgTa5F0l9Y7',0,0,'2021-02-18 08:18:27');
/*!40000 ALTER TABLE `transactional_token_blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactional_website_records`
--

DROP TABLE IF EXISTS `transactional_website_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactional_website_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` char(50) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `transactional_website_records_chk_1` CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactional_website_records`
--

LOCK TABLES `transactional_website_records` WRITE;
/*!40000 ALTER TABLE `transactional_website_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactional_website_records` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-18 13:51:55
