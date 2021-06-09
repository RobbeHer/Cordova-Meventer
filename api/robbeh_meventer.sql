-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 25, 2019 at 11:09 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `robbeh_meventer`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bericht`
--

CREATE TABLE `Bericht` (
  `berichtid` int(255) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gebruikerid` int(255) NOT NULL,
  `kamerid` int(255) NOT NULL,
  `tekst` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Chatroom`
--

CREATE TABLE `Chatroom` (
  `kamerid` int(255) NOT NULL,
  `gebruikt` varchar(255) NOT NULL,
  `doorid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Chatroom`
--

INSERT INTO `Chatroom` (`kamerid`, `gebruikt`, `doorid`) VALUES
(1, 'ja', 16),
(8, 'ja', 16),
(9, 'ja', 18);

-- --------------------------------------------------------

--
-- Table structure for table `Deelnemer`
--

CREATE TABLE `Deelnemer` (
  `deelnemerid` int(255) NOT NULL,
  `gebruikerid` int(255) NOT NULL,
  `kamerid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Deelnemer`
--

INSERT INTO `Deelnemer` (`deelnemerid`, `gebruikerid`, `kamerid`) VALUES
(1, 16, 1),
(2, 17, 1),
(9, 16, 8),
(10, 18, 8),
(11, 18, 9),
(12, 17, 9);

-- --------------------------------------------------------

--
-- Table structure for table `Evenement`
--

CREATE TABLE `Evenement` (
  `evenementid` int(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `naam` varchar(255) NOT NULL,
  `gebruikerid` int(255) NOT NULL,
  `land` varchar(255) NOT NULL,
  `gemeente` varchar(255) NOT NULL,
  `straat` varchar(255) NOT NULL,
  `startdatum` varchar(255) NOT NULL,
  `startuur` varchar(255) NOT NULL,
  `einddatum` varchar(255) NOT NULL,
  `einduur` varchar(255) NOT NULL,
  `prijs` varchar(255) NOT NULL,
  `details` varchar(9999) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Evenement`
--

INSERT INTO `Evenement` (`evenementid`, `foto`, `naam`, `gebruikerid`, `land`, `gemeente`, `straat`, `startdatum`, `startuur`, `einddatum`, `einduur`, `prijs`, `details`) VALUES
(83, 'image:6916.jpg', 'Presentatie Cordova', 16, 'België', 'Geel2240', 'Kleinhoefstraat 4', '2019-11-28', '15:15', '2019-11-28', '15:30', '0', 'Verdediging app Meventer.'),
(84, 'image:6906.jpg', 'Verjaardags feest Seppe', 16, 'België', 'Heultje, westerlo 2260', 'Vlinderstraat 1', '2019-11-29', '09:00', '2019-11-30', '15:30', '0', 'Een danske plaseren, frituur hapjes en games.');

-- --------------------------------------------------------

--
-- Table structure for table `Gebruiker`
--

CREATE TABLE `Gebruiker` (
  `gebruikerid` int(255) NOT NULL,
  `naam` varchar(255) NOT NULL,
  `land` varchar(255) NOT NULL,
  `gemeente` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `wachtwoord` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Gebruiker`
--

INSERT INTO `Gebruiker` (`gebruikerid`, `naam`, `land`, `gemeente`, `email`, `wachtwoord`) VALUES
(16, 'Robbe Heremans', 'België', 'Westerlo 2260', 'r@r', '$2y$10$AnhZXdRj6K4LhkXe5t4qn.Q0ZVPVWCRDog20Ezm330dEejNUYOI92'),
(17, 'test account', 'België', 'Geel 2440', 't@t', '$2y$10$PPmjotISYxwZ.CPTbeM98eYCsTx4kFQys71Vc7barmgSMhgb.anCW'),
(18, 'Sander Vermunicht', 'België', 'Aarschot 3200', 's@s', '$2y$10$cEtrCpPd6Vn23EaiN1YUY.IqbqZV392rC.SFr4jcRM1sheqJffrnC'),
(19, 'Jef', 'België', 'Westerlo', 'j@j', '$2y$10$t2gLTtMErNCr/SGKNwgTcO.Aa9/HvOpy.aXv8oe2ybQZ1zbxAYQsK');

-- --------------------------------------------------------

--
-- Table structure for table `Log`
--

CREATE TABLE `Log` (
  `logid` int(255) NOT NULL,
  `gebruikerid` int(255) NOT NULL,
  `evenementid` int(255) NOT NULL,
  `datum` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Opgeslagen`
--

CREATE TABLE `Opgeslagen` (
  `opgeslagenid` int(255) NOT NULL,
  `gebruikerid` int(255) NOT NULL,
  `evenementid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Opgeslagen`
--

INSERT INTO `Opgeslagen` (`opgeslagenid`, `gebruikerid`, `evenementid`) VALUES
(67, 16, 84),
(68, 16, 83);

-- --------------------------------------------------------

--
-- Table structure for table `Vrienden`
--

CREATE TABLE `Vrienden` (
  `meldingid` int(255) NOT NULL,
  `gebruikerid1` int(255) NOT NULL,
  `gebruikerid2` int(255) NOT NULL,
  `geaccepteerd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Vrienden`
--

INSERT INTO `Vrienden` (`meldingid`, `gebruikerid1`, `gebruikerid2`, `geaccepteerd`) VALUES
(50, 16, 18, 'false'),
(51, 16, 18, 'true'),
(52, 16, 17, 'true'),
(53, 17, 18, 'true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bericht`
--
ALTER TABLE `Bericht`
  ADD PRIMARY KEY (`berichtid`);

--
-- Indexes for table `Chatroom`
--
ALTER TABLE `Chatroom`
  ADD PRIMARY KEY (`kamerid`);

--
-- Indexes for table `Deelnemer`
--
ALTER TABLE `Deelnemer`
  ADD PRIMARY KEY (`deelnemerid`);

--
-- Indexes for table `Evenement`
--
ALTER TABLE `Evenement`
  ADD PRIMARY KEY (`evenementid`);

--
-- Indexes for table `Gebruiker`
--
ALTER TABLE `Gebruiker`
  ADD PRIMARY KEY (`gebruikerid`);

--
-- Indexes for table `Log`
--
ALTER TABLE `Log`
  ADD PRIMARY KEY (`logid`);

--
-- Indexes for table `Opgeslagen`
--
ALTER TABLE `Opgeslagen`
  ADD PRIMARY KEY (`opgeslagenid`);

--
-- Indexes for table `Vrienden`
--
ALTER TABLE `Vrienden`
  ADD PRIMARY KEY (`meldingid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bericht`
--
ALTER TABLE `Bericht`
  MODIFY `berichtid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;
--
-- AUTO_INCREMENT for table `Chatroom`
--
ALTER TABLE `Chatroom`
  MODIFY `kamerid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `Deelnemer`
--
ALTER TABLE `Deelnemer`
  MODIFY `deelnemerid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `Evenement`
--
ALTER TABLE `Evenement`
  MODIFY `evenementid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
--
-- AUTO_INCREMENT for table `Gebruiker`
--
ALTER TABLE `Gebruiker`
  MODIFY `gebruikerid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `Log`
--
ALTER TABLE `Log`
  MODIFY `logid` int(255) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Opgeslagen`
--
ALTER TABLE `Opgeslagen`
  MODIFY `opgeslagenid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT for table `Vrienden`
--
ALTER TABLE `Vrienden`
  MODIFY `meldingid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
