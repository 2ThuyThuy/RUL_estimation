use rul;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0; -- to disable them
SET FOREIGN_KEY_CHECKS=1; -- to re-enable them

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
  `is_user` int,
  PRIMARY KEY (`Unit`, `Timestep`)
);
create TABLE `UserMachineRaw` (
  `id` int  AUTO_INCREMENT primary key,
  `user_id` varchar(50),
  `Unit` int
  #`number_machine` int,
);
ALTER TABLE `UserMachineRaw` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
ALTER TABLE `UserMachineRaw` ADD FOREIGN KEY (`Unit`) REFERENCES `MachineRaw` (`Unit`);


## table processed
create TABLE `MachineProcessed` (
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
  `is_user` int,
  PRIMARY KEY (`Unit`, `Timestep`)
);
create TABLE `UserMachine` (
  `id` int  AUTO_INCREMENT primary key,
  `user_id` varchar(50),
  `Unit` int
);
create TABLE `ReportRUL` (
  `id` int  AUTO_INCREMENT primary key,
  `Timestep` int,
  `Unit` int,
  `day_predict` date,
  `day_error` date,
  `remaining_day` int,
  `category` varchar(255),
  `acc` float,
  `is_user` int
);

create TABLE `TrainDataFused` (
  `smooth_health_indicator` float,
  `Unit` int,
  `Timestep` int
);




ALTER TABLE `UserMachine` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
ALTER TABLE `UserMachine` ADD FOREIGN KEY (`Unit`) REFERENCES `MachineProcessed` (`Unit`);

#ALTER TABLE`ReportRUL` ADD FOREIGN KEY (`Unit`) REFERENCES `MachineProcessed` (`Unit`) ON DELETE CASCADE;


insert into UserMachineRaw (user_id, Unit) values ("617968d0-d12b-11ed-a29f-2e2ce998040e", 176);



#insert into UserMachine (user_id, Unit) values ("617968d0-d12b-11ed-a29f-2e2ce998040e", 176);


select * from user;
select * from  UserMachineRaw;
select * from MachineRaw;

select * from  UserMachine;
select * from MachineRaw;

select  Unit,
	Max(Timestep) as maxTimestep
from machineraw
group by Unit;


## create may to many 
select *
from MachineRaw inner join UserMachineRaw
on MachineRaw.Unit = UserMachineRaw.Unit
where UserMachineRaw.user_id = "617968d0-d12b-11ed-a29f-2e2ce998040e";



select *
from MachineRaw 
where MachineRaw.Timestamp = '2023-01-30' and MachineRaw.Unit = 176;




select * from ReportRUL;

select * from ReportRUL where Unit = 176;
select * from machineprocessed where Unit = 176; 
select * from machineraw where Unit = 176;

# select Timestep >= 50
delete  from MachineProcessed
where Timestep = 77;



