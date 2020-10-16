/*
SQLyog Ultimate v9.62 
MySQL - 5.5.9 : Database - saridb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`saridb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `saridb`;

/*Table structure for table `applystoreowners` */

DROP TABLE IF EXISTS `applystoreowners`;

CREATE TABLE `applystoreowners` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `storename` text,
  `location` text,
  `owner_name` text,
  `email` text,
  `status` enum('Waiting','Accepted','Rejected') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `applystoreowners` */

insert  into `applystoreowners`(`id`,`storename`,`location`,`owner_name`,`email`,`status`) values (1,'Bulayos\' Store','Tangnan','Rose, Rose','user','Waiting'),(3,'Grocery-BQ','tagb','Bq','user','Accepted'),(4,'Alturas Gorcery','tagb','Alturas','user2','Accepted'),(5,'Aturas Home Fashion','Tagb','Alturas','user3','Accepted'),(6,'Renzo Store','Sagbayan','Renzo','renzo','Accepted');

/*Table structure for table `auths` */

DROP TABLE IF EXISTS `auths`;

CREATE TABLE `auths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

/*Data for the table `auths` */

insert  into `auths`(`id`,`name`,`description`) values (1,'Auths (Create)','Auths (Create)'),(2,'Auths (Read)','Auths (Read)'),(3,'Auths (Update)','Auths (Update)'),(5,'Auths (Delete)','Auths (Delete)'),(6,'Products (Create)','Products (Create)'),(7,'Products (Read)','Products (Read)'),(8,'Products (Update)','Products (Update)'),(9,'Products (Delete)','Products (Delete)'),(10,'UserAuths (Create)','UserAuths (Create)'),(11,'UserAuths (Update)','UserAuths (Update)'),(12,'UserAuths (Delete)','UserAuths (Delete)'),(13,'UserAuths (Read)','UserAuths (Read)'),(14,'RoleAuths (Create)','RoleAuths (Create)'),(15,'RoleAuths (Update)','RoleAuths (Update)'),(16,'RoleAuths (Delete)','RoleAuths (Delete)'),(17,'RoleAuths (Read)','RoleAuths (Read)'),(19,'Store (Create)','Store (Create)'),(20,'Store (Read)','Store (Read)'),(21,'Store (Delete)','Store (Delete)'),(22,'Store (Update)','Store (Update)'),(23,'Users (Create)','Users (Create)'),(24,'Users (Read)','Users (Read)'),(25,'Users (Update)','Users (Update)'),(26,'Users (Delete)','Users (Delete)'),(27,'Store Products (Create)','Store Products (Create)'),(28,'Store Products (Read)','Store Products (Read)'),(29,'Store Products (Update)','Store Products (Update)'),(30,'Store Products (Delete)','Store Products (Delete)'),(31,'Orders (Read)','Orders (Read)'),(32,'Orders (Delete)','Orders (Delete)'),(33,'Orders (Update)','Orders (Update)'),(35,'Orders (Create)','Orders (Create)'),(37,'Store User (Read)','Store User (Read)'),(38,'Store User (Update)','Store User (Update)'),(39,'Store User (Delete)','Store User (Delete)'),(40,'User Role (Create)','User Role (Create)'),(41,'User Role (Read)','User Role (Read)'),(42,'User Role (Update)','User Role (Update)'),(43,'User Role (Delete)','User Role (Delete)'),(44,'Store Application (Create)','Store Application (Create)'),(45,'Store Application (Read)','Store Application (Read)'),(46,'Store Application (Update)','Store Application (Update)'),(47,'Store Application (Delete)','Store Application (Delete)');

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(15) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `from` varchar(50) DEFAULT NULL,
  `to` varchar(50) DEFAULT NULL,
  `to_role` enum('user','admin','superadmin','disabled','storeowner','storeuser') DEFAULT NULL,
  `content` text,
  `date_created` text,
  `read` enum('true','false') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=latin1;

/*Data for the table `messages` */

insert  into `messages`(`id`,`from`,`to`,`to_role`,`content`,`date_created`,`read`) values (000000000000087,'admin','user',NULL,'Hi user. I\'m admin. nice meeting you.','2020-09-05 13:59:06','true'),(000000000000088,'user','admin',NULL,'Hello admin.\nIm user nice meeting you too.','2020-09-05 14:00:44','true'),(000000000000089,'admin','user',NULL,'Oki. Im glad too.','2020-09-05 14:01:29','true'),(000000000000090,'admin','user',NULL,'hi. are u still there','2020-09-05 14:05:19','true'),(000000000000091,'user','admin',NULL,'yah of course. u?','2020-09-05 14:06:57','true'),(000000000000092,'admin','user',NULL,'im here too.','2020-09-05 14:07:25','true'),(000000000000093,'admin','user',NULL,'I love you','2020-09-05 14:36:28','true'),(000000000000094,'user','admin',NULL,'i love you too.','2020-09-05 14:37:17','true'),(000000000000151,'admin','user',NULL,'can u pls go to my office','2020-09-07 10:22:38','true'),(000000000000152,'admin','user',NULL,'gieford loves you','2020-09-21 15:52:52','true'),(000000000000153,'admin','user',NULL,'hi user. can you please order our products.','2020-09-21 15:53:26','true'),(000000000000154,'admin','user',NULL,'hehhhe. are you sure?','2020-09-21 15:55:38','true');

/*Table structure for table `orderproducts` */

DROP TABLE IF EXISTS `orderproducts`;

CREATE TABLE `orderproducts` (
  `orderId` int(20) NOT NULL,
  `storeId` int(20) NOT NULL,
  `productId` int(20) NOT NULL,
  `count` int(10) DEFAULT NULL,
  `isAvailable` enum('true','false') DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`orderId`,`storeId`,`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `orderproducts` */

insert  into `orderproducts`(`orderId`,`storeId`,`productId`,`count`,`isAvailable`,`price`) values (19,7,75,2,'true',22),(19,7,76,3,'true',51.57),(20,7,75,8,'true',22),(20,7,76,5,'true',51.57),(20,7,77,2,'true',56.9),(20,7,78,2,'true',4),(20,7,79,3,'true',3),(20,7,80,1,'false',0);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `userId` int(20) DEFAULT NULL,
  `fullName` text,
  `address` text,
  `contact` text,
  `status` enum('pending','done','canceled','processed') DEFAULT NULL,
  `storeId` int(20) NOT NULL,
  `date` text,
  `totalprice` double DEFAULT NULL,
  `storeuserIdProcess` int(20) DEFAULT '-1',
  `storeuserIdDeliver` int(20) DEFAULT '-1',
  PRIMARY KEY (`id`,`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `orders` */

insert  into `orders`(`id`,`userId`,`fullName`,`address`,`contact`,`status`,`storeId`,`date`,`totalprice`,`storeuserIdProcess`,`storeuserIdDeliver`) values (19,59,'christine rose bulayo','marawis, valencia, bohol','0900909090909','canceled',7,'2020-09-21 13:51:44',198.71,110,110),(20,59,'gieford taga-an','tangnana, panglao bohol','09463645489','pending',7,'2020-09-21 14:39:58',564.65,-1,-1);

/*Table structure for table `pcategories` */

DROP TABLE IF EXISTS `pcategories`;

CREATE TABLE `pcategories` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `pcategories` */

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`description`) values (0000000075,'oishi','snacks'),(0000000076,'Kinugay','Sweet use for sweetining food and to flavor some dishes in our kitchen.'),(0000000077,'Soap','Clean'),(0000000078,'Shampoo','Clean'),(0000000079,'Oil','Cooking'),(0000000080,'Vinegar','Cooking'),(0000000081,'Salt','Cooking'),(0000000082,'Soy Sauce','Cooking'),(0000000084,'Odong','Pansit');

/*Table structure for table `productscategories` */

DROP TABLE IF EXISTS `productscategories`;

CREATE TABLE `productscategories` (
  `productId` int(20) NOT NULL,
  `categoryId` int(20) NOT NULL,
  PRIMARY KEY (`productId`,`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `productscategories` */

/*Table structure for table `roleauths` */

DROP TABLE IF EXISTS `roleauths`;

CREATE TABLE `roleauths` (
  `authId` int(15) NOT NULL,
  `role` enum('superadmin','admin','disabled','user','storeuser','storeowner') NOT NULL,
  PRIMARY KEY (`authId`,`role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `roleauths` */

insert  into `roleauths`(`authId`,`role`) values (1,'superadmin'),(2,'superadmin'),(3,'superadmin'),(5,'superadmin'),(6,'superadmin'),(7,'superadmin'),(7,'user'),(8,'superadmin'),(9,'superadmin'),(10,'superadmin'),(11,'superadmin'),(12,'superadmin'),(13,'superadmin'),(14,'superadmin'),(15,'superadmin'),(16,'superadmin'),(17,'superadmin'),(19,'superadmin'),(20,'superadmin'),(21,'superadmin'),(22,'superadmin'),(23,'superadmin'),(24,'superadmin'),(25,'superadmin'),(26,'superadmin'),(27,'superadmin'),(27,'storeowner'),(28,'superadmin'),(28,'storeowner'),(29,'superadmin'),(29,'storeowner'),(30,'superadmin'),(30,'storeowner'),(31,'superadmin'),(31,'storeowner'),(32,'superadmin'),(32,'storeowner'),(33,'superadmin'),(33,'storeowner'),(36,'storeowner'),(37,'storeowner'),(38,'storeowner'),(39,'storeowner');

/*Table structure for table `storeproducts` */

DROP TABLE IF EXISTS `storeproducts`;

CREATE TABLE `storeproducts` (
  `productId` int(15) NOT NULL,
  `storeId` int(15) NOT NULL,
  `price` float DEFAULT NULL,
  `count` int(15) DEFAULT NULL,
  PRIMARY KEY (`productId`,`storeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `storeproducts` */

insert  into `storeproducts`(`productId`,`storeId`,`price`,`count`) values (75,7,22,22),(76,7,51.57,51),(77,7,56.9,78),(80,7,9.56,34),(81,7,5,60),(82,7,4.67,23);

/*Table structure for table `stores` */

DROP TABLE IF EXISTS `stores`;

CREATE TABLE `stores` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `location` text,
  `owner` text,
  `isdisabled` enum('true','false') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `stores` */

insert  into `stores`(`id`,`name`,`location`,`owner`,`isdisabled`) values (6,'Grocery-BQ','tagb','Bq','false'),(7,'Alturas Gorcery','tagb','Alturas','false'),(8,'Aturas Home Fashion','Tagb','Alturas','false'),(14,'Renzo Store','Sagbayan','Renzo','false');

/*Table structure for table `userauths` */

DROP TABLE IF EXISTS `userauths`;

CREATE TABLE `userauths` (
  `authId` int(15) unsigned zerofill NOT NULL,
  `userId` int(15) NOT NULL,
  PRIMARY KEY (`authId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `userauths` */

insert  into `userauths`(`authId`,`userId`) values (000000000000001,59),(000000000000002,59),(000000000000003,59),(000000000000005,59),(000000000000006,59),(000000000000007,59),(000000000000007,100),(000000000000007,110),(000000000000007,111),(000000000000007,112),(000000000000008,59),(000000000000009,59),(000000000000010,59),(000000000000012,59),(000000000000013,59),(000000000000014,59),(000000000000016,59),(000000000000017,59),(000000000000019,59),(000000000000023,59),(000000000000024,59),(000000000000025,59),(000000000000026,59),(000000000000027,59),(000000000000027,93),(000000000000027,110),(000000000000027,111),(000000000000027,113),(000000000000028,59),(000000000000028,93),(000000000000028,110),(000000000000028,111),(000000000000028,113),(000000000000029,59),(000000000000029,93),(000000000000029,110),(000000000000029,111),(000000000000029,113),(000000000000030,59),(000000000000030,93),(000000000000030,110),(000000000000030,111),(000000000000030,113),(000000000000031,59),(000000000000031,93),(000000000000031,110),(000000000000031,111),(000000000000031,113),(000000000000032,59),(000000000000032,93),(000000000000032,110),(000000000000032,111),(000000000000032,113),(000000000000033,59),(000000000000033,93),(000000000000033,110),(000000000000033,111),(000000000000033,113),(000000000000036,59),(000000000000036,93),(000000000000036,110),(000000000000036,111),(000000000000036,113),(000000000000037,93),(000000000000037,110),(000000000000037,111),(000000000000037,113),(000000000000038,59),(000000000000038,93),(000000000000038,110),(000000000000038,111),(000000000000038,113),(000000000000039,93),(000000000000039,110),(000000000000039,111),(000000000000039,113),(000000000000042,59),(000000000000045,59),(000000000000046,59);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `email` varchar(50) DEFAULT NULL,
  `password` text,
  `role` enum('user','admin','superadmin','disabled','storeowner','storeuser') DEFAULT NULL,
  `created` text,
  `storeId` int(20) DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`first_name`,`last_name`,`email`,`password`,`role`,`created`,`storeId`) values (00000000059,'Gieford','Taga-an','admin','$2b$10$obXzsyY2Y232va0WxGHB9eVKnEspiG98vBg9WTLdB3Z7ieir29brC','superadmin','2020-09-01 05:04:45',-1),(00000000091,'admin1','admin1','admin1','$2b$10$aWK76U8VKxvOsKUZGfrJ5O6owPzU3DZhZMI8DKPfc7v2sg9.FP.BC','admin','2020-08-20 05:53:11',-1),(00000000092,'storeowner','storeowner','storeowner','$2b$10$umdicgRcF.RgZfQnMg24eeMbqppgoqyLSNz6zsygrnWb/Qh/DDxEW','user','2020-08-11 12:20:19',-1),(00000000093,'user','user','user','$2b$10$VaVom.WYsJ0b999R2zrk..Q/SJ4Zi62gweKTWUonN1p8a2jD/2HA6','user','2020-09-23 03:21:18',-1),(00000000094,'storeuser','storeuser','storeuser','$2b$10$kZd.5xlwTP4XSsA.R7NW.OEl2/9WxD1lVeUl6N2ccD4A/DAoppNcO','storeuser','2020-08-20 05:53:33',-1),(00000000108,'reguser','reguser','reguser','$2b$10$jpAvCnS44K7H6vhHUkzIvextHuSB.GKO/EYng6leSQ0aksA31F.Dm','user','2020-09-14 03:17:17',-1),(00000000110,'user2gihapon','user2gihapon','user2','$2b$10$xOG0JBdCNoqdtmPYI73KteZfyX8m2FMcA1m7Ye3eDPUvj3gfglLLG','storeowner','2020-09-17 13:07:16',7),(00000000111,'user3','user3','user3','$2b$10$VU8SoaLR9ysy0bWDMDoYW.Yk/IhI3WJyepY8GYJ18Zcc/XhuOGY5i','user','2020-09-17 13:07:17',7),(00000000112,'user4','user4','user4','$2b$10$2Htj8UmySgV7APYcElq/Q./IEtR.jHpC7QhSdgu1d99bt2.DL5ORK','user','2020-09-17 13:04:32',-1),(00000000113,'renzo','renzo','renzo','$2b$10$pQuKiqo7PsozItYZ1F4lSOziWHJgCCEXGuj0iEYVyh1gyOpcmh8/2','storeowner','2020-09-23 03:41:34',14),(00000000114,'giefordgiefordgiefordgiefordgiefordgiefordgieford','giefordgiefordgiefordgiefordgiefordgiefordgieford','giefordgiefordgiefordgiefordgiefordgiefordgieford','$2b$10$t73x3GRb.Ftx87uepvyYE.07qzdg4K/KSv0Cu3lUpJMysN4yf272y','user','2020-09-26 04:09:06',-1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
