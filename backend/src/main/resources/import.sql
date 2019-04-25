INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (1, uuid(), 0, 'employee', 'Jan', 'Kowalski')
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (2, uuid(), 0, 'manager', 'Andrzej', 'Baranowski')
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (3, uuid(), 0, 'approver', 'Wiktoria', 'Chetmańczyk')
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (4, uuid(), 0, 'accountant', 'Monika', 'Piorun')

INSERT INTO checklist_template(id, uuid, version, country_iso3) VALUES (1, uuid(), 0, 'GLO');

INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (1, uuid(), 0, 'Influenza vaccine', 'You must have an influenza vaccine.', 1);
INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (2, uuid(), 0, 'Visa', 'You must get a visa to the destination country.', 1);
INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (3, uuid(), 0, 'Flight booking', 'You must book your flight 7 days in advance.', 1);
