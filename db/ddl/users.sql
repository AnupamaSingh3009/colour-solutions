CREATE TABLE "catalog".users (
	userid int NOT NULL GENERATED ALWAYS AS IDENTITY,
	username varchar NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	"password" varchar NULL,
	firstname varchar NULL,
	lastname varchar NULL,
	contactnumber varchar NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);
