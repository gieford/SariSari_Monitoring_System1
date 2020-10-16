/*
SQLyog Ultimate v9.62 
MySQL - 5.5.9 : Database - nodejs_login1
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodejs_login1` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `nodejs_login1`;

/*Table structure for table `auths` */

DROP TABLE IF EXISTS `auths`;

CREATE TABLE `auths` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `auths` */

insert  into `auths`(`id`,`name`,`description`) values (1,'Add Products','Add Products'),(2,'Add Auths','Add Auths'),(3,'View Auths','View Auths'),(4,'Update Auths','Update Auths'),(5,'Add User','Add User'),(6,'Update User','Update User'),(7,'Add UserAuths','Add UserAuths'),(8,'View UserAuths','View UserAuths');

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` text,
  `price` double DEFAULT '0',
  `description` text,
  `count` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`price`,`description`,`count`) values (0000000008,'super crunch spicy',2,'spicy cracker',200),(0000000009,'oishi',12,'Spicy crunchy',10),(0000000010,'Sugar',20,'Sweet',50),(0000000013,'Ice2',1,'Cold',1000),(0000000014,'Ice3',1,'Cold',1000),(0000000015,'Ice4',1,'Cold',1000),(0000000016,'Ice5',1,'Cold',1000),(0000000017,'Ice6',1,'Cold',1000),(0000000018,'Ice7',1,'Cold',1000),(0000000019,'Ice8',1,'Cold',1000),(0000000020,'Ice9',1,'Cold',1000),(0000000021,'Ice10',1,'Cold',1000),(0000000022,'MilK',10,'Milk',100),(0000000023,'MilK1',10,'Milk',100),(0000000024,'MilK2',10,'Milk',100),(0000000025,'MilK3',10,'Milk',100),(0000000026,'MilK5',10,'Milk',100),(0000000027,'MilK4',10,'Milk',100),(0000000028,'MilK6',10,'Milk',100),(0000000029,'MilK7',10,'Milk',100),(0000000030,'MilK8',10,'Milk',100),(0000000031,'MilK9',10,'Milk',100),(0000000032,'MilK10',10,'Milk',100),(0000000033,'MilK11',10,'Milk',100),(0000000034,'MilK12',10,'Milk',100),(0000000035,'MilK13',10,'Milk',100),(0000000036,'MilK15',10,'Milk',100),(0000000037,'MilK14',10,'Milk',100),(0000000038,'MilK16',10,'Milk',100),(0000000039,'MilK17',10,'Milk',100),(0000000040,'MilK18',10,'Milk',100),(0000000041,'MilK19',10,'Milk',100),(0000000042,'MilK20',10,'Milk',100),(0000000043,'MilK21',10,'Milk',100),(0000000044,'MilK22',10,'Milk',100),(0000000045,'MilK23',10,'Milk',100),(0000000046,'MilK24',10,'Milk',100),(0000000047,'MilK25',10,'Milk',100),(0000000048,'MilK26',10,'Milk',100),(0000000049,'MilK27',10,'Milk',100),(0000000050,'MilK28',10,'Milk',100),(0000000051,'MilK29',10,'Milk',100),(0000000052,'MilK30',10,'Milk',100),(0000000064,'bombay',10,'searsonings',100),(0000000065,'sili',1,'hang',100),(0000000066,'sili-dihang',2,'sili',105),(0000000067,'qe',1,'qwe`',123),(0000000068,'bombay2',10,'searsonings',100),(0000000069,'bombay3',10,'searsonings',100),(0000000070,'bombay5',5,'5',5),(0000000071,'asdf',4,'4',4),(0000000072,'asdfg',5,'5',5);

/*Table structure for table `user123s` */

DROP TABLE IF EXISTS `user123s`;

CREATE TABLE `user123s` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `email` text,
  `password` text,
  `created` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

/*Data for the table `user123s` */

insert  into `user123s`(`id`,`first_name`,`last_name`,`email`,`password`,`created`) values (00000000040,'s','s','s','$2b$10$X8LxsCHfQPbCTwScDdNE.eXJzWXwbQFknOjXVBLYeGwufNyViNpiS','2020-01-23 09:26:21'),(00000000041,'q','q','q','$2b$10$sVdetScKxZHDk9OvMwvveuzKu4iVfUTjfFkR8CrtBHtbPaQjGzvM.','2020-01-23 06:59:03'),(00000000042,'z','z','z','$2b$10$/qIhgKWdPQHfkXZ.qh3WNONryPiWN.3eBQRKAvXb9JgMFJG2YvbX6','2020-01-23 08:42:26'),(00000000043,'f','f','f','$2b$10$zFZkTqxVAKVypRpm4w6DCubPUxFzGApMyKn/dkt1xPTN0D1LUR4W6','2020-01-23 08:47:19'),(00000000044,'e','e','e','$2b$10$hJlIJdNKj3KbFLf5bIIanO.HYRELpGnCGmUpJt4P/RjzlEMFOnzpi','2020-01-23 08:48:57'),(00000000045,'gieford','gieford','gieford','$2b$10$V20rQ.oZ7cA554qSkaC4u.JeOv4fXnaXPB/nmvdTcch27Z/eoowSG','2020-03-10 05:10:06'),(00000000052,'ASD','asd','asd','$2b$10$9vmcumNJI2S4vnDX8a/32u//8zSY6.Yw8f/y/BrsDgzLimwsEIOI.','2020-03-25 11:35:36'),(00000000054,'admin','admin','admin','$2b$10$CvhGjKXi8JLXMUgt85PWJuNhN5M05VL2PZVwjF9OHNkai6CaR6hDu','2020-04-30 00:25:39'),(00000000055,'admin1','admin1','admin1','$2b$10$UU9ZpfVRdc00afHJn0VgaOLoXLcCRXhaa/l4BUw4yK2KJBBvT.Fpy','2020-04-30 02:23:52');

/*Table structure for table `userauths` */

DROP TABLE IF EXISTS `userauths`;

CREATE TABLE `userauths` (
  `authId` int(15) unsigned zerofill NOT NULL,
  `userId` int(15) NOT NULL,
  PRIMARY KEY (`authId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `userauths` */

insert  into `userauths`(`authId`,`userId`) values (000000000000001,54),(000000000000002,54),(000000000000003,54),(000000000000004,54),(000000000000005,54),(000000000000007,54);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
