CREATE DATABASE  IF NOT EXISTS `giftoria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `giftoria`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: giftoria
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'General',
  `quantity` int unsigned NOT NULL DEFAULT '0',
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bougie parfumée','Bougie artisanale aux notes de vanille.',1200.00,'General',18,NULL,'2026-06-03 19:58:30'),(2,'Tasse personnalisée','Tasse en céramique avec un message offert.',1500.00,'General',34,NULL,'2026-06-03 19:58:30'),(3,'Coffret cadeau','Sélection de petits cadeaux pour toutes occasions.',3000.00,'General',12,NULL,'2026-06-03 19:58:30'),(4,'Bougie parfumée','Bougie artisanale aux notes de vanille.',1200.00,'General',18,NULL,'2026-06-03 20:02:52'),(5,'Tasse personnalisée','Tasse en céramique avec un message offert.',1500.00,'General',34,NULL,'2026-06-03 20:02:52'),(6,'Coffret cadeau','Sélection de petits cadeaux pour toutes occasions.',3000.00,'General',12,NULL,'2026-06-03 20:02:52'),(7,'Bougie parfumée','Bougie artisanale aux notes de vanille.',1200.00,'General',18,NULL,'2026-06-05 08:18:57'),(8,'Tasse personnalisée','Tasse en céramique avec un message offert.',1500.00,'General',34,NULL,'2026-06-05 08:18:57'),(9,'Coffret cadeau','Sélection de petits cadeaux pour toutes occasions.',3000.00,'General',12,NULL,'2026-06-05 08:18:57');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-05 10:31:15
