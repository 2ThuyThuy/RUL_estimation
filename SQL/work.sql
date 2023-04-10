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
  `user_id` int,
  `machine_id` int,
  `number_machine` int,
  PRIMARY KEY (`user_id`, `machine_id`)
);

CREATE TABLE `MachineProcessed` (
  `machine_id` int PRIMARY KEY,
  `time_stamp` int,
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
  `sensor_21` float
);

CREATE TABLE `Machine` (
  `machine_id` int PRIMARY KEY,
  `timeStamp` int,
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
  `sensor_21` float
);

CREATE TABLE `CategoryMachine` (
  `id` int PRIMARY KEY,
  `category` varchar(255),
  `num_machine` int
);

CREATE TABLE `TrainDataFused` (
  `DataFused` float,
  `machine_id` int,
  `time` int
);

ALTER TABLE `UserMachine` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `UserMachine` ADD FOREIGN KEY (`machine_id`) REFERENCES `MachineProcessed` (`machine_id`);

ALTER TABLE `MachineProcessed` ADD FOREIGN KEY (`machine_id`) REFERENCES `CategoryMachine` (`id`);
