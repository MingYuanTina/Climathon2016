CREATE database climathon;
USE climathon;

Create table profile(
    id Int Auto_Increment Primary Key,
    parent_name varChar(25),
    address varchar(256),
    postal_code varChar(6),
    email varchar(256),
    phone_number VARCHAR(256),
    latitude FLOAT(10,6) NOT NULL,
    longitude FLOAT(10,6) NOT NULL,
    seats_available int (2),
    parent_picture_url varchar(256)
);

Create table student(
	id Int Auto_Increment Primary Key,
    student_name varchar(25),
    student_picture_url varchar(256),
    profile_id varchar(256),
    class_year varchar(2)
    
);