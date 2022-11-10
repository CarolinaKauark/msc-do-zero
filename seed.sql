USE `register_db`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `person`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO register_db.person (name, email, birth_date, cpf) VALUES
    ("Ted Evelyn Mosby", "schmoby@email.com", "1978-04-25", '12345678910' ),
    ("Barney Stinson", "Swarley@email.com", "1975-11-11", '33388856480' ),
    ("Robin Scherbatsky", "sparkles@email.com", "1980-07-23", '96314785234' );

-- ("Marshall Eriksen", "marshmallow@email.com", "1978-02-15", '25639874125' ),
-- ("Lily Aldrin", "lilypad@email.com", "1978-03-24", '12348569741' ),