create type category_types as ENUM ('INCOME', 'EXPENSE');

create table categories (
	id serial primary key,
	name varchar(50) unique not null,
	category category_types not null
);