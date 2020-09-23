-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: rsitems
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `attack_style`
--

DROP TABLE IF EXISTS `attack_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attack_style` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weaponType` varchar(45) DEFAULT NULL,
  `combatStyle` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `attackStyle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attack_style`
--

LOCK TABLES `attack_style` WRITE;
/*!40000 ALTER TABLE `attack_style` DISABLE KEYS */;
INSERT INTO `attack_style` VALUES (1,'blunt','Pound','Crush','Accurate'),(2,'blunt','Pummel','Crush','Aggressive'),(3,'blunt','Block','Crush','Defensive'),(4,'staff','Bash','Crush','Accurate'),(5,'staff','Pound','Crush','Aggressive'),(6,'staff','Focus','Crush','Defensive'),(7,'hacksword','Chop','Slash','Accurate'),(8,'hacksword','Slash','Slash','Aggressive'),(9,'hacksword','Lunge','Stab','Controlled'),(10,'hacksword','Block','Slash','Defensive'),(11,'stabsword','Stab','Stab','Accurate'),(12,'stabsword','Lunge','Stab','Aggressive'),(13,'stabsword','Slash','Slash','Aggressive'),(14,'stabsword','Block','Stab','Defensive'),(15,'thrown','Accurate','Ranged','Accurate'),(16,'thrown','Rapid','Ranged','Rapid'),(17,'thrown','Longrange','Ranged','Longrange'),(18,'spear','Lunge','Stab','Controlled'),(19,'spear','Swipe','Slash','Controlled'),(20,'spear','Pound','Crush','Controlled'),(21,'spear','Block','Stab','Defensive'),(22,'axe','Chop','Slash','Accurate'),(23,'axe','Hack','Slash','Aggressive'),(24,'axe','Smash','Crush','Aggressive'),(25,'axe','Block','Slash','Defensive'),(26,'unarmed','Punch','Crush','Accurate'),(27,'unarmed','Kick','Crush','Aggressive'),(28,'unarmed','Block','Crush','Defensive'),(29,'crossbow','Accurate','Ranged','Accurate'),(30,'crossbow','Rapid','Ranged','Rapid'),(31,'crossbow','Longrange','Ranged','Longrange'),(32,'spiked','Pound','Crush','Accurate'),(33,'spiked','Pummel','Crush','Aggressive'),(34,'spiked','Spike','Stab','Controlled'),(35,'spiked','Block','Crush','Defensive'),(36,'bow','Accurate','Ranged','Accurate'),(37,'bow','Rapid','Ranged','Rapid'),(38,'bow','Longrange','Ranged','Longrange'),(39,'polestaff','Bash','Crush','Accurate'),(40,'polestaff','Pound','Crush','Aggressive'),(41,'polestaff','Block','Crush','Defensive'),(42,'heavysword','Chop','Slash','Accurate'),(43,'heavysword','Slash','Slash','Aggressive'),(44,'heavysword','Smash','Crush','Aggressive'),(45,'heavysword','Block','Slash','Defensive'),(46,'pickaxe','Spike','Stab','Accurate'),(47,'pickaxe','Impale','Stab','Aggressive'),(48,'pickaxe','Smash','Crush','Aggressive'),(49,'pickaxe','Block','Stab','Defensive'),(50,'banner','Lunge','Stab','Accurate'),(51,'banner','Swipe','Slash','Aggressive'),(52,'banner','Pound','Crush','Controlled'),(53,'banner','Block','Stab','Defensive'),(54,'claws','Chop','Slash','Accurate'),(55,'claws','Slash','Slash','Aggressive'),(56,'claws','Lunge','Stab','Controlled'),(57,'claws','Block','Slash','Defensive'),(58,'polearm','Jab','Stab','Controlled'),(59,'polearm','Swipe','Slash','Aggressive'),(60,'polearm','Fend','Stab','Defensive'),(61,'whip','Flick','Slash','Accurate'),(62,'whip','Lash','Slash','Controlled'),(63,'whip','Deflect','Slash','Defensive'),(64,'grenade','Short fuse','Ranged','Accurate'),(65,'grenade','Medium fuse','Ranged','Rapid'),(66,'grenade','Long fuse','Ranged','Longrange'),(67,'flamer','Scorch','Slash','Aggressive'),(68,'flamer','Flare','Ranged','Rapid'),(69,'flamer','Blaze','Magic','Magic'),(70,'staff bladed','Jab','Stab','Accurate'),(71,'staff bladed','Swipe','Slash','Aggressive'),(72,'staff bladed','Fend','Crush','Defensive'),(73,'staff selfpowered','Accurate','Magic','Accurate'),(74,'staff selfpowered','Accurate','Magic','Accurate'),(75,'staff selfpowered','Longrange','Magic','Longrange'),(76,'gun','Kick','Crush','Aggressive'),(77,'bludgeon','Pound','Crush','Aggressive'),(78,'bludgeon','Pummel','Crush','Aggressive'),(79,'bludgeon','Smash','Crush','Aggressive'),(80,'bulwark','Pummel','Crush','Accurate');
/*!40000 ALTER TABLE `attack_style` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-19 21:52:44
