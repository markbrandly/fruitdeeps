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
-- Table structure for table `weapon_info`
--

DROP TABLE IF EXISTS `weapon_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weapon_info` (
  `itemId` int NOT NULL,
  `weaponType` varchar(45) DEFAULT NULL,
  `attackSpeed` int DEFAULT NULL,
  PRIMARY KEY (`itemId`),
  UNIQUE KEY `itemId_UNIQUE` (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapon_info`
--

LOCK TABLES `weapon_info` WRITE;
/*!40000 ALTER TABLE `weapon_info` DISABLE KEYS */;
INSERT INTO `weapon_info` VALUES (1840,'heavysword',7),(1841,'spear',5),(1843,'heavysword',7),(1844,'claws',4),(1845,'polearm',7),(1846,'spear',5),(1847,'spear',5),(1848,'heavysword',7),(1849,'claws',4),(1850,'claws',4),(1851,'heavysword',7),(1852,'polearm',7),(1853,'spear',5),(1860,'spiked',6),(1861,'bow',5),(1862,'bow',5),(1863,'heavysword',7),(1864,'blunt',5),(1865,'blunt',7),(1866,'spear',5),(1867,'bow',6),(1868,'bow',4),(1869,'bow',6),(1870,'bow',8),(1879,'polearm',7),(1880,'polearm',7),(1883,'bow',9),(1885,'spear',5),(1889,'bow',6),(1890,'bow',4),(1891,'bow',6),(1893,'bow',5),(1897,'spear',5),(1899,'polearm',7),(1901,'claws',4),(1903,'claws',4),(1904,'gun',4),(1905,'bow',5),(1906,'axe',7),(1907,'heavysword',6),(1908,'heavysword',6),(1913,'polestaff',6),(1915,'flamer',5),(1920,'flamer',5),(1922,'hacksword',4),(1923,'bow',4),(1924,'unarmed',3),(1925,'bow',4),(1930,'bludgeon',4),(1931,'crossbow',7),(1932,'crossbow',7),(1933,'heavysword',7),(1934,'spear',5),(1935,'heavysword',6),(1936,'heavysword',6),(1939,'blunt',4),(1940,'blunt',6),(1942,'blunt',6),(1943,'blunt',4),(1945,'bulwark',7),(1950,'polearm',7),(1951,'spear',5),(1952,'spear',5),(1954,'blunt',5),(1955,'blunt',7),(1956,'crossbow',4),(1957,'bow',4),(1959,'polearm',7),(1961,'claws',4),(1962,'blunt',4),(1964,'blunt',4),(1965,'stabsword',4),(1966,'heavysword',7),(1967,'spear',5),(2258,'crossbow',6),(2259,'crossbow',6),(2260,'thrown',5),(2261,'pickaxe',5),(2262,'axe',6),(2263,'stabsword',4),(2264,'hacksword',4),(2265,'stabsword',4),(2266,'blunt',6),(2267,'spear',5),(2268,'spiked',5),(2269,'stabsword',4),(2270,'axe',6),(2271,'pickaxe',5),(2272,'crossbow',6),(2273,'thrown',5),(2274,'hacksword',5),(2275,'thrown',3),(2276,'axe',5),(2277,'axe',5),(2278,'axe',5),(2279,'stabsword',4),(2280,'axe',6),(2281,'crossbow',6),(2282,'stabsword',4),(2283,'thrown',3),(2284,'spear',5),(2285,'axe',5),(2286,'thrown',3),(2287,'hacksword',5),(2288,'spiked',5),(2289,'pickaxe',5),(2290,'hacksword',4),(2291,'stabsword',4),(2292,'thrown',5),(2293,'blunt',6),(2294,'staff',6),(2295,'staff',5),(2296,'axe',6),(2297,'spiked',5),(2298,'stabsword',4),(2299,'staff',4),(2300,'axe',5),(2301,'stabsword',4),(2302,'thrown',3),(2303,'thrown',3),(2304,'spear',5),(2305,'spiked',5),(2306,'hacksword',5),(2307,'spiked',5),(2308,'thrown',5),(2309,'pickaxe',5),(2310,'axe',6),(2311,'stabsword',4),(2312,'spear',5),(2313,'thrown',3),(2314,'hacksword',5),(2315,'spiked',5),(2316,'pickaxe',5),(2317,'stabsword',4),(2318,'blunt',6),(2319,'stabsword',4),(2320,'blunt',6),(2321,'crossbow',6),(2322,'thrown',3),(2323,'thrown',3),(2324,'hacksword',5),(2325,'spiked',5),(2326,'pickaxe',5),(2327,'stabsword',4),(2328,'stabsword',4),(2329,'hacksword',4),(2330,'blunt',6),(2331,'stabsword',4),(2332,'staff',5),(2333,'staff',4),(2334,'crossbow',6),(2335,'hacksword',5),(2336,'spear',6),(2337,'claws',4),(2338,'hacksword',4),(2339,'spear',4),(2340,'stabsword',4),(2341,'hacksword',4),(2342,'stabsword',4),(2343,'hacksword',5),(2344,'crossbow',5),(2345,'axe',6),(2346,'stabsword',4),(2347,'thrown',3),(2348,'blunt',4),(2349,'staff',5),(2350,'stabsword',4),(2351,'hacksword',5),(2352,'unarmed',4),(2353,'staff',5),(2354,'hacksword',4),(2355,'blunt',6),(2357,'thrown',3),(2358,'staff',5),(2359,'hacksword',4),(2360,'stabsword',4),(2361,'staff',5),(2362,'spear',6),(2363,'staff',5),(2364,'blunt',4),(2365,'staff',5),(2366,'blunt',4),(2367,'crossbow',6),(2368,'blunt',5),(2369,'grenade',4),(2370,'hacksword',4),(2371,'hacksword',5),(2372,'polestaff',5),(2373,'staff',5),(2374,'staff',5),(2375,'staff',5),(2376,'staff',5),(2377,'hacksword',4),(2378,'thrown',4),(2379,'stabsword',4),(2380,'staff',5),(2381,'stabsword',4),(2382,'hacksword',5),(2383,'staff',5),(2384,'hacksword',4),(2385,'stabsword',4),(2386,'staff',5),(2387,'hacksword',4),(2388,'axe',5),(2389,'thrown',3),(2390,'axe',5),(2391,'axe',5),(2392,'hacksword',4),(2393,'hacksword',5),(2394,'stabsword',4),(2395,'hacksword',5),(2396,'blunt',5),(2397,'staff',4),(2398,'thrown',5),(2399,'thrown',3),(2400,'thrown',3),(2401,'thrown',3),(2402,'crossbow',6),(2403,'staff',5),(2404,'spiked',5),(2405,'spiked',5),(2406,'unarmed',4),(2407,'blunt',6),(2408,'blunt',4),(2409,'crossbow',6),(2410,'hacksword',5),(2411,'stabsword',5),(2412,'stabsword',4),(2413,'blunt',4),(2414,'blunt',4),(2415,'blunt',4),(2416,'blunt',4),(2417,'blunt',4),(2418,'blunt',4),(2419,'blunt',4),(2420,'axe',5),(2421,'staff',5),(2422,'staff',5),(2423,'staff',4),(2424,'staff',5),(2425,'spear',4),(2426,'unarmed',4),(2427,'axe',6),(2428,'staff',4),(2429,'hacksword',5),(2431,'grenade',4),(2432,'hacksword',5),(2433,'hacksword',5),(2434,'stabsword',4),(2435,'blunt',5),(2436,'stabsword',4),(2437,'blunt',6),(2438,'staff',5),(2440,'staff',5),(2441,'stabsword',4),(2442,'blunt',6),(2443,'spear',5),(2444,'stabsword',4),(2445,'staff',5),(2446,'spiked',5),(2447,'claws',4),(2448,'blunt',4),(2449,'staff',5),(2450,'blunt',4),(2451,'banner',4),(2452,'staff',5),(2453,'staff',5),(2454,'hacksword',4),(2455,'crossbow',6),(2456,'staff',5),(2457,'staff',5),(2458,'crossbow',4),(2459,'staff bladed',4),(2460,'unarmed',4),(2461,'blunt',5),(2462,'banner',4),(2463,'banner',4),(2464,'banner',4),(2465,'banner',4),(2466,'banner',4),(2467,'stabsword',4),(2468,'unarmed',4),(2469,'staff',5),(2470,'spear',4),(2471,'staff',5),(2475,'banner',4),(2476,'banner',4),(2478,'staff',5),(2479,'spear',4),(2480,'pickaxe',5),(2481,'whip',4),(2482,'grenade',4),(2483,'hacksword',4),(2484,'staff',5),(2485,'staff',5),(2486,'blunt',4),(2487,'hacksword',5),(2488,'pickaxe',5),(2489,'staff',4),(2490,'polestaff',5),(2491,'hacksword',4),(2492,'polestaff',4),(2493,'spiked',5),(2494,'heavysword',5),(2495,'spiked',5),(2496,'spiked',5),(2497,'staff',5),(2498,'staff',5),(2499,'staff',5),(2500,'staff',5),(2501,'unarmed',4),(2502,'whip',4),(2503,'whip',4),(2507,'stabsword',4),(2508,'stabsword',4),(2509,'stabsword',4),(2510,'stabsword',4),(2511,'polestaff',5),(2512,'polestaff',5),(2513,'polestaff',5),(2514,'polestaff',5),(2515,'pickaxe',5),(2516,'axe',5),(2521,'unarmed',4),(2522,'unarmed',4),(2523,'stabsword',4),(2524,'banner',4),(2526,'blunt',5),(2527,'blunt',5),(2528,'blunt',5),(2529,'blunt',5),(2530,'blunt',5),(2531,'blunt',5),(2532,'blunt',5),(2533,'blunt',5),(2534,'blunt',6),(2535,'unarmed',4),(2536,'hacksword',4),(2553,'polestaff',5),(2554,'pickaxe',5),(2555,'unarmed',4),(2556,'blunt',4),(2557,'polestaff',5),(2558,'polestaff',5),(2559,'polestaff',5),(2560,'polestaff',5),(2561,'spear',5),(2562,'hacksword',4),(2563,'blunt',4),(2564,'blunt',4),(2565,'unarmed',4),(2566,'staff',5),(2567,'staff',5),(2568,'staff',5),(2569,'stabsword',4),(2570,'blunt',4),(2571,'stabsword',5),(2572,'stabsword',4),(2573,'crossbow',6),(2574,'thrown',5),(2575,'staff',4),(2576,'stabsword',5),(2577,'crossbow',6),(2580,'blunt',4),(2581,'staff',4),(2582,'polestaff',5),(2583,'blunt',4),(2584,'staff',4),(2585,'staff',4),(2586,'staff',4),(2587,'hacksword',5),(2588,'unarmed',4),(2589,'blunt',4),(2590,'staff bladed',4),(2593,'blunt',4),(2594,'stabsword',4),(2596,'hacksword',4),(2597,'staff selfpowering',4),(2598,'unarmed',4),(2599,'unarmed',4),(2600,'unarmed',4),(2602,'staff',5),(2603,'hacksword',4),(2604,'hacksword',4),(2605,'staff selfpowering',4),(2609,'hacksword',5),(2610,'blunt',5),(2611,'thrown',5),(2612,'thrown',6),(2613,'staff',5),(2614,'thrown',4),(2615,'blunt',4),(2616,'spear',4),(2617,'thrown',3),(2618,'spear',4),(2619,'blunt',4),(2620,'unarmed',4),(2621,'blunt',4),(2622,'unarmed',5),(2623,'unarmed',5),(2624,'unarmed',5),(2625,'blunt',4),(2626,'staff',5),(2627,'thrown',3),(2628,'spear',5),(2629,'hacksword',5),(2630,'staff',4),(2631,'hacksword',5),(2632,'hacksword',4),(2633,'thrown',5),(2634,'blunt',6),(2635,'stabsword',4),(2636,'staff',5),(2637,'stabsword',4),(2638,'unarmed',4),(2639,'stabsword',4),(2641,'blunt',6),(2642,'whip',4),(2643,'blunt',5),(2645,'staff',5),(2646,'axe',5),(2647,'hacksword',5),(2648,'unarmed',5),(2649,'axe',5),(2650,'axe',6),(2651,'thrown',3),(2653,'blunt',3),(2654,'staff',5),(2655,'pickaxe',5),(2656,'axe',5),(2657,'staff',5),(2662,'axe',6),(2663,'hacksword',4),(2664,'spiked',5),(2665,'hacksword',4),(2666,'stabsword',4),(2667,'axe',6),(2668,'unarmed',4),(6532,'Unarmed',4);
/*!40000 ALTER TABLE `weapon_info` ENABLE KEYS */;
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
