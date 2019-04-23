INSERT INTO user(id, login) VALUES (1, 'employee')
INSERT INTO user(id, login) VALUES (2, 'manager')
INSERT INTO user(id, login) VALUES (3, 'approver')
INSERT INTO user(id, login) VALUES (4, 'accountant')

INSERT INTO checklist_template(id, country_iso3) VALUES (1, 'POL');

INSERT INTO activity_template(id, task, description, checklist_template_id) VALUES (1, 'task1', 'desc1', 1);
INSERT INTO activity_template(id, task, description, checklist_template_id) VALUES (2, 'task2', 'desc2', 1);
INSERT INTO activity_template(id, task, description, checklist_template_id) VALUES (3, 'task3', 'desc3', 1);
INSERT INTO activity_template(id, task, description, checklist_template_id) VALUES (4, 'task4', 'desc4', 1);
INSERT INTO activity_template(id, task, description, checklist_template_id) VALUES (5, 'task5', 'desc5', 1);