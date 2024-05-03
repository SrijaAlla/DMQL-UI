CREATE DATABASE imdb;

CREATE TABLE IF NOT EXISTS basics_imdb
(
    tconst character varying(25) COLLATE pg_catalog."default" NOT NULL,
    titletype character varying(100) COLLATE pg_catalog."default",
    primarytitle character varying(600) COLLATE pg_catalog."default",
    originaltitle character varying(600) COLLATE pg_catalog."default",
    isadult character varying(20) COLLATE pg_catalog."default",
    startyear integer,
    endyear integer,
    runtimeminutes integer,
    CONSTRAINT basics_imdb_pkey PRIMARY KEY (tconst)
);
