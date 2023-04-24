use rul;


CREATE TABLE `User` (
  `user_id` varchar(50) PRIMARY KEY,
  `username` varchar(100),
  `password_hash` varchar(255),
  `first_name` varchar(50),
  `last_name` varchar(50),
  `email` varchar(200),
  `phone_number` varchar(20),
  `role` bool
);

select * from user;

CREATE TABLE `MachineProcessed` (
  `machine_id` int,
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
  `sensor_21` float,
  PRIMARY KEY (machine_id, time_stamp)
);
# add primary key
ALTER TABLE MachineProcessed
ADD PRIMARY KEY (machine_id, time_stamp);
# add 

create TABLE `UserMachine` (
  `id` int  AUTO_INCREMENT primary key,
  `user_id` varchar(50),
  `machine_id` int
  #`number_machine` int,
);

ALTER TABLE `UserMachine` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `UserMachine` ADD FOREIGN KEY (`machine_id`) REFERENCES `MachineProcessed` (`machine_id`);




select * from user;
select * from  UserMachine;
select * from MachineProcessed;




## create may to many 
select *
from MachineProcessed inner join UserMachine
on MachineProcessed.Machine_id = UserMachine.Machine_id
where UserMachine.user_id = "617968d0-d12b-11ed-a29f-2e2ce998040e";

