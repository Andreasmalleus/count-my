CREATE TABLE counts (
   id     SERIAL PRIMARY KEY,
   identifier uuid UNIQUE NOT NULL,
   data    JSON
);