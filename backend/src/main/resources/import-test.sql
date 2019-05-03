INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (1, uuid(), 0, 'employee', 'Jan', 'Kowalski');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (2, uuid(), 0, 'manager', 'Andrzej', 'Baranowski');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (3, uuid(), 0, 'approver', 'Wiktoria', 'Chetmańczyk');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (4, uuid(), 0, 'accountant', 'Monika', 'Piorun');

INSERT INTO checklist_template(id, uuid, version, country_iso3) VALUES (1, uuid(), 0, 'GLO');
