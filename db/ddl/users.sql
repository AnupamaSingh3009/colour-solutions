CREATE TABLE "catalog".users (
	userid integer NOT NULL GENERATED ALWAYS AS IDENTITY,
	username varchar NOT NULL,
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
	"password" varchar NULL,
	firstname varchar NULL,
	lastname varchar NULL,
	contactnumber varchar NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	UNIQUE(username)
);
