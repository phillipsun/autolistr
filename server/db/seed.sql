CREATE TABLE houses (
  id serial primary key,
  make varchar(50),
  model varchar(50),
  year integer,
  mileage integer,
  img text,
  description text,
  price integer,
  user_id integer FOREIGN KEY REFERENCES users(user_id),
  vin text
);

CREATE TABLE users (
  user_id serial primary key,
  email varchar(100),
  name varchar(100)
);