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

select * from user