CREATE TABLE `User` (
  `user_id` int PRIMARY KEY,
  `username` varchar(255),
  `password` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `phone_number` varchar(255),
  `role` int
);

CREATE TABLE `UserMachine` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `Unit` int
);

CREATE TABLE `UserMachineRaw` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `Unit` int
);

CREATE TABLE `MachineProcessed` (
  `Unit` int,
  `Timestep` int,
  `Timestamp` date,
  `op_setting_1` float,
  `op_setting_2` float,
  `op_setting_3` float,
  `sensor_1` float,
  `sensor_2` float,
  `sensor_3` float,
  `sensor_4` float,
  `sensor_5` float,
  `sensor_6` float,
  `sensor_7` float,
  `sensor_8` float,
  `sensor_9` float,
  `sensor_10` float,
  `sensor_11` float,
  `sensor_12` float,
  `sensor_13` float,
  `sensor_14` float,
  `sensor_15` float,
  `sensor_16` float,
  `sensor_17` float,
  `sensor_18` float,
  `sensor_19` float,
  `sensor_20` float,
  `sensor_21` float,
  `cluster` int,
  PRIMARY KEY (`Unit`, `Timestep`)
);

CREATE TABLE `MachineRaw` (
  `Unit` int,
  `Timestep` int,
  `Timestamp` date,
  `op_setting_1` float,
  `op_setting_2` float,
  `op_setting_3` float,
  `sensor_1` float,
  `sensor_2` float,
  `sensor_3` float,
  `sensor_4` float,
  `sensor_5` float,
  `sensor_6` float,
  `sensor_7` float,
  `sensor_8` float,
  `sensor_9` float,
  `sensor_10` float,
  `sensor_11` float,
  `sensor_12` float,
  `sensor_13` float,
  `sensor_14` float,
  `sensor_15` float,
  `sensor_16` float,
  `sensor_17` float,
  `sensor_18` float,
  `sensor_19` float,
  `sensor_20` float,
  `sensor_21` float,
  PRIMARY KEY (`Unit`, `Timestep`)
);

CREATE TABLE `ReportRUL` (
  `step_predict` int,
  `Unit` int,
  `day_pedict` date,
  `day_error` date,
  `remaining_day` int,
  `category` varchar(255),
  `acc` float,
  PRIMARY KEY (`step_predict`, `Unit`)
);

CREATE TABLE `TrainDataFused` (
  `smooth_health_indicator` float,
  `Unit` int,
  `Timestep` int
);

ALTER TABLE `UserMachine` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `UserMachineRaw` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `UserMachine` ADD FOREIGN KEY (`Unit`) REFERENCES `MachineProcessed` (`Unit`);

ALTER TABLE `UserMachineRaw` ADD FOREIGN KEY (`Unit`) REFERENCES `MachineRaw` (`Unit`);

ALTER TABLE `MachineProcessed` ADD FOREIGN KEY (`Unit`) REFERENCES `ReportRUL` (`Unit`);
