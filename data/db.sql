USE migration;

CREATE TABLE role (
    role_id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE person (
    person_id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    ssn VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role_id BIGINT REFERENCES role,
    username VARCHAR(255)
);

CREATE TABLE availability (
    availability_id BIGINT PRIMARY KEY,
    person_id BIGINT REFERENCES person,
    from_date DATE,
    to_date DATE
);

CREATE TABLE competence (
    competence_id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE competence_profile (
    competence_profile_id BIGINT PRIMARY KEY,
    person_id BIGINT REFERENCES person,
    competence_id BIGINT REFERENCES competence,
    years_of_experience NUMERIC(4,2)
);

INSERT INTO role (role_id, name) VALUES (1, "recruit");

INSERT INTO role (role_id, name) VALUES (2, "applicant");

INSERT INTO person (person_id, name, surname, username, password, role_id)
VALUES (1, "Greta", "Borg", "borg", "wl9nk23a", 1);

INSERT INTO person (person_id, name, surname, ssn, email, role_id)
VALUES (2, "Per", "Strand", "19671212-1211", "per@strand.kth.se", 2);

INSERT INTO availability (availability_id, person_id, from_date, to_date)
VALUES (1, 2, "2014-02-23", "2014-05-25");

INSERT INTO availability (availability_id, person_id, from_date, to_date)
VALUES (2, 2, "2014-07-10", "2014-08-10");

INSERT INTO competence (competence_id, name)
VALUES (1, "Korvgrillning");

INSERT INTO competence (competence_id, name)
VALUES (2, "Karuselldrift");

INSERT INTO competence_profile (competence_profile_id, person_id, competence_id, years_of_experience)
VALUES (1, 2, 1, 3.5);

INSERT INTO competence_profile (competence_profile_id, person_id, competence_id, years_of_experience)
VALUES (2, 2, 2, 2.0);
