create type genders as ENUM ('MALE', 'FEMALE', 'OTHERS');
create type roles as enum ('NORMAL_USER', 'ADMIN_USER', 'SUPER_USER');

create table users (
	id serial primary key,
	email varchar(50) unique not null,
	password varchar not null,
	first_name varchar(20) not null,
	last_name varchar(20),
	gender genders not null ,
	is_active boolean default true,
	role roles not null default 'NORMAL_USER',
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);