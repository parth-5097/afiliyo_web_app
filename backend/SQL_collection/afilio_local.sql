-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2021 at 11:01 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `afilio`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `loginStatus` tinyint(1) NOT NULL DEFAULT 1,
  `id` bigint(20) NOT NULL,
  `name` char(255) NOT NULL DEFAULT '',
  `gender` char(10) NOT NULL DEFAULT '',
  `username` char(255) DEFAULT NULL,
  `dob` char(255) NOT NULL DEFAULT '',
  `phoneNumber` char(15) DEFAULT NULL,
  `email` char(255) DEFAULT NULL,
  `password` char(255) NOT NULL DEFAULT '',
  `otp_iat` varchar(255) NOT NULL DEFAULT '0',
  `otp_number` int(11) DEFAULT NULL,
  `otp_status` tinyint(1) DEFAULT 0,
  `fcm_token` char(200) DEFAULT NULL,
  `post_id` longtext DEFAULT NULL,
  `item_id` longtext DEFAULT NULL,
  `profile_id` bigint(20) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `accounts`
--
DELIMITER $$
CREATE TRIGGER `after_account_update` AFTER UPDATE ON `accounts` FOR EACH ROW INSERT IGNORE INTO `refer` SET user_id=OLD.id, refer_code=(SELECT LEFT(UUID(),8))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` char(50) DEFAULT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `parent_id` char(100) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `col_name` char(100) NOT NULL,
  `data` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` char(50) DEFAULT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `msg` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `likes` bigint(11) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `follower`
--

CREATE TABLE `follower` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `f_id` bigint(20) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `f_id` bigint(20) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hashtag`
--

CREATE TABLE `hashtag` (
  `id` bigint(11) NOT NULL,
  `name` char(150) NOT NULL,
  `countPost` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` char(50) NOT NULL,
  `image` longtext NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `gender` char(10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` char(100) DEFAULT NULL,
  `link` char(200) NOT NULL,
  `clicks` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `items`
--
DELIMITER $$
CREATE TRIGGER `before_item_update` BEFORE UPDATE ON `items` FOR EACH ROW INSERT INTO item_data_history SET action="update",id=OLD.id,user_id=OLD.user_id,clicks=OLD.clicks
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `item_data_history`
--

CREATE TABLE `item_data_history` (
  `id` char(100) NOT NULL,
  `user_id` char(50) NOT NULL,
  `clicks` bigint(20) NOT NULL DEFAULT 0,
  `action` varchar(50) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `like_post`
--

CREATE TABLE `like_post` (
  `id` int(11) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `isLiked` tinyint(1) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `new_role_req`
--

CREATE TABLE `new_role_req` (
  `id` int(11) NOT NULL,
  `username` char(50) NOT NULL,
  `role` char(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `timestamp` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` bigint(20) NOT NULL,
  `image` longtext NOT NULL,
  `description` text NOT NULL,
  `likes` bigint(20) NOT NULL DEFAULT 0,
  `share` int(11) NOT NULL DEFAULT 0,
  `hashtag` text NOT NULL,
  `item_id` text NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `savePost` bigint(20) DEFAULT 0,
  `commentPost` bigint(20) NOT NULL DEFAULT 0,
  `tagBrand` text NOT NULL,
  `region` char(50) NOT NULL DEFAULT 'IN',
  `height` int(11) NOT NULL DEFAULT 0,
  `width` int(11) NOT NULL DEFAULT 0,
  `reach` bigint(20) NOT NULL DEFAULT 0,
  `impression` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `post`
--
DELIMITER $$
CREATE TRIGGER `before_post_update` BEFORE UPDATE ON `post` FOR EACH ROW INSERT INTO `post_data_history` SET action = 'update', id=OLD.id, user_id=OLD.user_id, likes = OLD.likes, share = OLD.share, savePost = OLD.savePost, commentPost = OLD.commentPost, reach = OLD.reach, impression = OLD.impression
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `post_data_history`
--

CREATE TABLE `post_data_history` (
  `id` char(50) NOT NULL,
  `likes` bigint(20) NOT NULL DEFAULT 0,
  `share` int(11) NOT NULL DEFAULT 0,
  `user_id` char(50) NOT NULL,
  `savePost` bigint(20) DEFAULT 0,
  `commentPost` bigint(20) NOT NULL DEFAULT 0,
  `reach` bigint(20) NOT NULL DEFAULT 0,
  `impression` bigint(20) NOT NULL DEFAULT 0,
  `action` char(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` bigint(20) NOT NULL,
  `review` double NOT NULL DEFAULT 0,
  `reviewSum` double DEFAULT 0,
  `reviewCount` int(11) DEFAULT 0,
  `bio` text NOT NULL DEFAULT '',
  `background_img` text NOT NULL DEFAULT '',
  `profile_pic_img` text NOT NULL DEFAULT '',
  `sh_instagram` text NOT NULL DEFAULT '',
  `sh_facebook` text NOT NULL DEFAULT '',
  `sh_tiktok` text NOT NULL DEFAULT '',
  `sh_twitter` text NOT NULL DEFAULT '',
  `sh_youtube` text NOT NULL DEFAULT '',
  `sh_website` text NOT NULL DEFAULT '',
  `visit` bigint(20) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `refer`
--

CREATE TABLE `refer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `refer_code` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `p_id` bigint(20) NOT NULL,
  `u_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `share_post`
--

CREATE TABLE `share_post` (
  `id` int(11) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_option`
--

CREATE TABLE `shipping_option` (
  `id` int(11) NOT NULL,
  `name` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `name` char(50) DEFAULT NULL,
  `item_condition` text DEFAULT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactional_image`
--

CREATE TABLE `transactional_image` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `path` char(100) DEFAULT NULL,
  `img_name` char(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactional_scrap_img`
--

CREATE TABLE `transactional_scrap_img` (
  `id` int(11) NOT NULL,
  `url` text DEFAULT NULL,
  `img` longtext NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactional_website_records`
--

CREATE TABLE `transactional_website_records` (
  `id` int(11) NOT NULL,
  `page` char(50) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `f_id` (`f_id`);

--
-- Indexes for table `hashtag`
--
ALTER TABLE `hashtag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `like_post`
--
ALTER TABLE `like_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `new_role_req`
--
ALTER TABLE `new_role_req`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refer`
--
ALTER TABLE `refer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `refer_code` (`refer_code`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role` (`role`);

--
-- Indexes for table `share_post`
--
ALTER TABLE `share_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_option`
--
ALTER TABLE `shipping_option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transactional_image`
--
ALTER TABLE `transactional_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactional_scrap_img`
--
ALTER TABLE `transactional_scrap_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactional_website_records`
--
ALTER TABLE `transactional_website_records`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `follower`
--
ALTER TABLE `follower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `following`
--
ALTER TABLE `following`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hashtag`
--
ALTER TABLE `hashtag`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `like_post`
--
ALTER TABLE `like_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `new_role_req`
--
ALTER TABLE `new_role_req`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refer`
--
ALTER TABLE `refer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `share_post`
--
ALTER TABLE `share_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_option`
--
ALTER TABLE `shipping_option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactional_image`
--
ALTER TABLE `transactional_image`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactional_scrap_img`
--
ALTER TABLE `transactional_scrap_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactional_website_records`
--
ALTER TABLE `transactional_website_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
