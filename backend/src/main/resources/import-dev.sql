INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (1, uuid(), 0, 'employee', 'Jan', 'Kowalski');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (2, uuid(), 0, 'manager', 'Andrzej', 'Baranowski');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (3, uuid(), 0, 'approver', 'Wiktoria', 'Chetmańczyk');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (4, uuid(), 0, 'accountant', 'Monika', 'Piorun');

INSERT INTO checklist_template(id, uuid, version, country_iso3) VALUES (1, uuid(), 0, 'GLO');

INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (1, uuid(), 0, 'Influenza vaccine', 'You must have an influenza vaccine.', 1);
INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (2, uuid(), 0, 'Visa', 'You must get a visa to the destination country.', 1);
INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (3, uuid(), 0, 'Flight booking', 'You must book your flight 7 days in advance.', 1);
INSERT INTO activity_template(id, uuid, version, task, description, checklist_template_id) VALUES (4, uuid(), 0, 'Medicines', 'You should buy headache medications.', 1);

INSERT INTO checklist(id, uuid, version) VALUES (1, uuid(), 0);

INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (1, uuid(), 0, 'Influenza vaccine', 'You must have an influenza vaccine.', 1, false);
INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (2, uuid(), 0, 'Visa', 'You must get a visa to the destination country.', 1, false);
INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (3, uuid(), 0, 'Flight booking', 'You must book your flight 7 days in advance.', 1, false);
INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (4, uuid(), 0, 'Medicines', 'You should buy headache medications.', 1, false);

INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_countryiso3, destination_location, end_date, start_date) VALUES (1, uuid(), 0, 1, 3, 'Sign new contract for new macbooks', 'CREATED', 'USA', 'Cupertino', '2019-05-03T10:12:00', '2019-06-04T18:30:00');
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_countryiso3, destination_location, end_date, start_date) VALUES (2, uuid(), 0, 1, 1, 'Webflux training', 'CHECKED', 'POL', 'Warsaw', '2019-02-01T08:13:00', '2019-02-01T17:00:00');
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_countryiso3, destination_location, end_date, start_date) VALUES (3, uuid(), 0, 1, 2, 'Delegation-Assistant training', 'APPROVED', 'POL', 'Lodz', '2019-04-24T11:00:00', '2019-04-24T012:00:00');
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_countryiso3, destination_location, end_date, start_date) VALUES (4, uuid(), 0, 1, 1, 'Vodafone demo meeting', 'FINALIZED', 'ISR', 'Jerusalem', '2019-01-04T12:30:00', '2019-01-18T13:05:00');
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_countryiso3, destination_location, end_date, start_date) VALUES (5, uuid(), 0, 1, 3, 'SRE team meeting', 'PREPARED', 'JPN', 'Tokio', '2019-03-03T09:15:00', '2019-03-15T017:20:00');
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_countryiso3, destination_location, end_date, start_date) VALUES (6, uuid(), 0, 1, 1, 'Romania DC audit', 'NEEDS_WORK', 'ROU', 'Bucharest', '2019-02-22T21:15:00', '2019-02-27T08:30:00');

INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (1, uuid(), 0, 'PLN', '2019-02-02', 'Ticket for plane', '120.25', 'CREDIT_CARD', 3);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (2, uuid(), 0, 'EUR', '2019-04-24', 'Ticket for train', '45.37', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (3, uuid(), 0, 'NIS', '2019-01-06', 'Dinner', '12.25', 'CREDIT_CARD', 4);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (4, uuid(), 0, 'JPY', '2019-03-04', 'Ramen', '840', 'CASH', 5);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (5, uuid(), 0, 'PLN', '2019-03-12', 'Taxi', '20.12', 'CASH', 5);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (6, uuid(), 0, 'RON', '2019-02-24', 'Ticket for train', '10.25', 'CREDIT_CARD', 6);

INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (1, uuid(), 0, 'example.png', 'paragon.png', 1);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (2, uuid(), 0, 'example.png', 'paragon.png', 2);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (3, uuid(), 0, 'example.png', 'paragon.png', 3);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (4, uuid(), 0, 'example.png', 'paragon.png', 4);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (5, uuid(), 0, 'example.png', 'paragon.png', 5);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (6, uuid(), 0, 'example.png', 'paragon.png', 6);
