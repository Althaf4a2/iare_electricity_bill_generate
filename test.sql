-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2024 at 02:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `sc_no` varchar(225) NOT NULL,
  `usc_no` varchar(225) NOT NULL,
  `meter_no` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(225) NOT NULL,
  `connection_phase` varchar(225) NOT NULL,
  `multiplication_factor` varchar(225) NOT NULL,
  `arrears_as_on_date` date NOT NULL,
  `arrears_after_date` date NOT NULL,
  `security_deposit` varchar(225) NOT NULL,
  `last_paid_date` date NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ero_no` varchar(225) NOT NULL,
  `ero_address` text NOT NULL,
  `ero_code` varchar(225) NOT NULL,
  `current_unit` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `sc_no`, `usc_no`, `meter_no`, `name`, `address`, `phone`, `connection_phase`, `multiplication_factor`, `arrears_as_on_date`, `arrears_after_date`, `security_deposit`, `last_paid_date`, `created_by`, `updated_by`, `created_date`, `updated_date`, `ero_no`, `ero_address`, `ero_code`, `current_unit`) VALUES
(1, '0', '0', 0, 'ALthaf', '', '', '0', '0', '0000-00-00', '0000-00-00', '0', '0000-00-00', 0, 0, '2024-01-12 10:00:35', '2024-01-12 10:00:35', '0', '', '0', 0),
(2, '7403788221', '475779', 1000, 'ALthaf', 'test', '8686861087', '1', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:12:58', '2024-01-12 19:12:58', '316', 'Qutballahpur', '16032', 0),
(3, '5546317849', '319302', 1000, 'ALthaf', 'test', '8686861087', '1', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:13:06', '2024-01-12 19:13:06', '316', 'Qutballahpur', '16032', 0),
(4, '7141039921', '165545', 1456, 'ALthaf', 'test', '8686861087', '1', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:14:20', '2024-01-12 19:14:20', '316', 'Qutballahpur', '16032', 0),
(5, '8519443597', '976580', 7878, 'Tetsing', 'best', '8989898989', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:15:41', '2024-01-12 19:15:41', '316', 'Qutballahpur', '16031', 0),
(6, '9038727188', '319691', 7878, 'Tetsing', 'best', '8989898989', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:18:04', '2024-01-12 19:18:04', '316', 'Qutballahpur', '16031', 0),
(7, '2857635843', '414279', 7878, 'Tetsing', 'best', '8989898989', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:18:13', '2024-01-12 19:18:13', '316', 'Qutballahpur', '16031', 0),
(8, '6405105044', '517105', 7878, 'aa', '787', '8868686866', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:21:47', '2024-01-12 19:21:47', '316', 'Qutballahpur', '16031', 0),
(9, '9159015922', '127373', 7878, 'alth', 'yuyuy', '9898989898', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:26:48', '2024-01-12 19:26:48', '316', 'Qutballahpur', '16032', 0),
(10, '5893027728', '900021', 8989, 'Althaf', 'yuyuy', '8989899888', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:29:39', '2024-01-12 19:29:39', '316', 'Qutballahpur', '16032', 0),
(11, '6301035277', '115036', 7887, 'Althaf', 'ytyty', '9898989898', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:33:12', '2024-01-12 19:33:12', '316', 'Qutballahpur', '16031', 0),
(12, '1534592812', '826768', 8888, 'AAAAAAA', 'YYYYY', '8989989889', '2', '2', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:37:55', '2024-01-12 19:37:55', '316', 'Qutballahpur', '16031', 0),
(13, '1037281366', '658598', 8787, 'ALthaf', '8', '8989899899', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:47:08', '2024-01-12 19:47:08', '316', 'Qutballahpur', '16032', 0),
(14, '7537857810', '612892', 8878, 'tyty', 'yuuyu', '9898998888', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:54:24', '2024-01-12 19:54:24', '316', 'Qutballahpur', '16031', 0),
(15, '5942950650', '730829', 2323, 'test', '76tut', '9090090990', '1', '2', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:58:23', '2024-01-12 19:58:23', '316', 'Qutballahpur', '16032', 0),
(16, '1866104767', '136797', 9899, 'tyty', 'ytyt', '8989898988', '2', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-12 19:59:01', '2024-01-12 19:59:01', '316', 'Qutballahpur', '16031', 0),
(17, '4802180161', '766725', 6789, 'patro', 'hyderabad', '8686868687', '1', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-13 06:14:27', '2024-01-13 06:14:27', '316', 'Qutballahpur', '16032', 0),
(18, '8025917609', '529086', 7878, 'asas', 'ytyt', '8989989988', '1', '1', '0000-00-00', '0000-00-00', '0', '0000-00-00', 1, 1, '2024-01-13 11:45:51', '2024-01-13 11:45:51', '316', 'Qutballahpur', '16032', 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `meter_no` int(11) NOT NULL,
  `previous_unit` int(11) NOT NULL,
  `current_unit` int(11) NOT NULL,
  `previous_date` varchar(225) NOT NULL,
  `energy_charges` int(11) NOT NULL,
  `customer_charges` int(11) NOT NULL,
  `bill_amount` int(11) NOT NULL,
  `net_amount` int(11) NOT NULL,
  `due_date` varchar(225) NOT NULL,
  `status` varchar(225) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `bill_no` varchar(225) NOT NULL,
  `present_date` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `customer_id`, `meter_no`, `previous_unit`, `current_unit`, `previous_date`, `energy_charges`, `customer_charges`, `bill_amount`, `net_amount`, `due_date`, `status`, `created_date`, `updated_date`, `created_by`, `updated_by`, `bill_no`, `present_date`) VALUES
(13, 0, 6789, 0, 200, '2024-0-13', 140, 0, 0, 140, '2024-011-13', '1', '2024-01-13 06:21:31', '2024-01-13 06:21:31', 1, 1, 'BILL001', '2024-01-13'),
(14, 0, 6789, 0, 678, '2024-0-13', 610, 0, 0, 610, '2024-011-13', '1', '2024-01-13 11:46:37', '2024-01-13 11:46:37', 1, 1, 'BILL001', '2024-01-13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
