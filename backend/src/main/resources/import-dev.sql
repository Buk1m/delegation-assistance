INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (1, uuid(), 0, 'employee', 'Jan', 'Kowalski');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (2, uuid(), 0, 'manager', 'Andrzej', 'Baranowski');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (3, uuid(), 0, 'approver', 'Wiktoria', 'Chetmańczyk');
INSERT INTO user(id, uuid, version, login, first_name, last_name) VALUES (4, uuid(), 0, 'accountant', 'Monika', 'Piorun');

INSERT INTO checklist_template(id, uuid, version) VALUES (1, uuid(), 0);

INSERT INTO activity_template(id, uuid, version, task, description, priority, checklist_template_id) VALUES (1, uuid(), 0, 'Influenza vaccine', 'You must have an influenza vaccine.', 0, 1);
INSERT INTO activity_template(id, uuid, version, task, description, priority, checklist_template_id) VALUES (2, uuid(), 0, 'Visa', 'You must get a visa to the destination country.', 1, 1);
INSERT INTO activity_template(id, uuid, version, task, description, priority, checklist_template_id) VALUES (3, uuid(), 0, 'Flight booking', 'You must book your flight 7 days in advance.', 3, 1);
INSERT INTO activity_template(id, uuid, version, task, description, priority, checklist_template_id) VALUES (4, uuid(), 0, 'Medicines', 'You should buy headache medications.', 2, 1);

INSERT INTO checklist(id, uuid, version) VALUES (1, uuid(), 0);

INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (1, uuid(), 0, 'Influenza vaccine', 'You must have an influenza vaccine.', 1, false);
INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (2, uuid(), 0, 'Visa', 'You must get a visa to the destination country.', 1, false);
INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (3, uuid(), 0, 'Flight booking', 'You must book your flight 7 days in advance.', 1, false);
INSERT INTO activity(id, uuid, version, task, description, checklist_id, is_done) VALUES (4, uuid(), 0, 'Medicines', 'You should buy headache medications.', 1, false);

INSERT INTO country(id, uuid, version, country_code, country_name) VALUES
(1, uuid(), 0, 'PRI', 'Puerto Rico'),
(2, uuid(), 0, 'ARM', 'Armenia'),
(3, uuid(), 0, 'GUF', 'French Guiana'),
(4, uuid(), 0, 'AUS', 'Australia'),
(5, uuid(), 0, 'TWN', 'Taiwan'),
(6, uuid(), 0, 'FRO', 'Faroe Islands'),
(7, uuid(), 0, 'SVN', 'Slovenia'),
(8, uuid(), 0, 'PNG', 'Papua New Guinea'),
(9, uuid(), 0, 'HKG', 'Hong Kong SAR China'),
(10, uuid(), 0, 'TGO', 'Togo'),
(11, uuid(), 0, 'RWA', 'Rwanda'),
(12, uuid(), 0, 'COG', 'Congo - Brazzaville'),
(13, uuid(), 0, 'DEU', 'Germany'),
(14, uuid(), 0, 'ISR', 'Israel'),
(15, uuid(), 0, 'LCA', 'St. Lucia'),
(16, uuid(), 0, 'MYS', 'Malaysia'),
(17, uuid(), 0, 'BMU', 'Bermuda'),
(18, uuid(), 0, 'SSD', 'South Sudan'),
(19, uuid(), 0, 'ITA', 'Italy'),
(20, uuid(), 0, 'SDN', 'Sudan'),
(21, uuid(), 0, 'REU', 'Réunion'),
(22, uuid(), 0, 'VGB', 'British Virgin Islands'),
(23, uuid(), 0, 'SMR', 'San Marino'),
(24, uuid(), 0, 'SGP', 'Singapore'),
(25, uuid(), 0, 'GNQ', 'Equatorial Guinea'),
(26, uuid(), 0, 'BES', 'Caribbean Netherlands'),
(27, uuid(), 0, 'NZL', 'New Zealand'),
(28, uuid(), 0, 'MAR', 'Morocco'),
(29, uuid(), 0, 'CAN', 'Canada'),
(30, uuid(), 0, 'TKM', 'Turkmenistan'),
(31, uuid(), 0, 'DMA', 'Dominica'),
(32, uuid(), 0, 'COL', 'Colombia'),
(33, uuid(), 0, 'TLS', 'Timor-Leste'),
(34, uuid(), 0, 'KGZ', 'Kyrgyzstan'),
(35, uuid(), 0, 'BWA', 'Botswana'),
(36, uuid(), 0, 'HRV', 'Croatia'),
(37, uuid(), 0, 'CIV', 'Côte d’Ivoire'),
(38, uuid(), 0, 'IRN', 'Iran'),
(39, uuid(), 0, 'GUM', 'Guam'),
(40, uuid(), 0, 'BFA', 'Burkina Faso'),
(41, uuid(), 0, 'ZWE', 'Zimbabwe'),
(42, uuid(), 0, 'MAF', 'St. Martin'),
(43, uuid(), 0, 'MNP', 'Northern Mariana Islands'),
(44, uuid(), 0, 'TKL', 'Tokelau'),
(45, uuid(), 0, 'LBN', 'Lebanon'),
(46, uuid(), 0, 'TCA', 'Turks & Caicos Islands'),
(47, uuid(), 0, 'MCO', 'Monaco'),
(48, uuid(), 0, 'KAZ', 'Kazakhstan'),
(49, uuid(), 0, 'SYR', 'Syria'),
(50, uuid(), 0, 'LIE', 'Liechtenstein'),
(51, uuid(), 0, 'ARG', 'Argentina'),
(52, uuid(), 0, 'HND', 'Honduras'),
(53, uuid(), 0, 'SWE', 'Sweden'),
(54, uuid(), 0, 'ZMB', 'Zambia'),
(55, uuid(), 0, 'GLP', 'Guadeloupe'),
(56, uuid(), 0, 'AIA', 'Anguilla'),
(57, uuid(), 0, 'MLT', 'Malta'),
(58, uuid(), 0, 'FRA', 'France'),
(59, uuid(), 0, 'SLV', 'El Salvador'),
(60, uuid(), 0, 'UGA', 'Uganda'),
(61, uuid(), 0, 'GMB', 'Gambia'),
(62, uuid(), 0, 'SPM', 'St. Pierre & Miquelon'),
(63, uuid(), 0, 'NOR', 'Norway'),
(64, uuid(), 0, 'FSM', 'Micronesia'),
(65, uuid(), 0, 'KHM', 'Cambodia'),
(66, uuid(), 0, 'JAM', 'Jamaica'),
(67, uuid(), 0, 'IMN', 'Isle of Man'),
(68, uuid(), 0, 'MTQ', 'Martinique'),
(69, uuid(), 0, 'UKR', 'Ukraine'),
(70, uuid(), 0, 'GRD', 'Grenada'),
(71, uuid(), 0, 'SHN', 'St. Helena'),
(72, uuid(), 0, 'DZA', 'Algeria'),
(73, uuid(), 0, 'COK', 'Cook Islands'),
(74, uuid(), 0, 'LVA', 'Latvia'),
(75, uuid(), 0, 'VIR', 'U.S. Virgin Islands'),
(76, uuid(), 0, 'IRL', 'Ireland'),
(77, uuid(), 0, 'TZA', 'Tanzania'),
(78, uuid(), 0, 'GIN', 'Guinea'),
(79, uuid(), 0, 'CYM', 'Cayman Islands'),
(80, uuid(), 0, 'THA', 'Thailand'),
(81, uuid(), 0, 'CCK', 'Cocos (Keeling) Islands'),
(82, uuid(), 0, 'WLF', 'Wallis & Futuna'),
(83, uuid(), 0, 'BTN', 'Bhutan'),
(84, uuid(), 0, 'BGR', 'Bulgaria'),
(85, uuid(), 0, 'SAU', 'Saudi Arabia'),
(86, uuid(), 0, 'ZAF', 'South Africa'),
(87, uuid(), 0, 'CRI', 'Costa Rica'),
(88, uuid(), 0, 'FIN', 'Finland'),
(89, uuid(), 0, 'YEM', 'Yemen'),
(90, uuid(), 0, 'HUN', 'Hungary'),
(91, uuid(), 0, 'PER', 'Peru'),
(92, uuid(), 0, 'LUX', 'Luxembourg'),
(93, uuid(), 0, 'GRL', 'Greenland'),
(94, uuid(), 0, 'IRQ', 'Iraq'),
(95, uuid(), 0, 'BEN', 'Benin'),
(96, uuid(), 0, 'TUV', 'Tuvalu'),
(97, uuid(), 0, 'MDA', 'Moldova'),
(98, uuid(), 0, 'AZE', 'Azerbaijan'),
(99, uuid(), 0, 'SJM', 'Svalbard & Jan Mayen'),
(100, uuid(), 0, 'KEN', 'Kenya'),
(101, uuid(), 0, 'PAK', 'Pakistan'),
(102, uuid(), 0, 'NCL', 'New Caledonia'),
(103, uuid(), 0, 'OMN', 'Oman'),
(104, uuid(), 0, 'PHL', 'Philippines'),
(105, uuid(), 0, 'USA', 'United States'),
(106, uuid(), 0, 'JPN', 'Japan'),
(107, uuid(), 0, 'TJK', 'Tajikistan'),
(108, uuid(), 0, 'ALA', 'Åland Islands'),
(109, uuid(), 0, 'UZB', 'Uzbekistan'),
(110, uuid(), 0, 'QAT', 'Qatar'),
(111, uuid(), 0, 'PRK', 'North Korea'),
(112, uuid(), 0, 'SYC', 'Seychelles'),
(113, uuid(), 0, 'GGY', 'Guernsey'),
(114, uuid(), 0, 'BRB', 'Barbados'),
(115, uuid(), 0, 'TUN', 'Tunisia'),
(116, uuid(), 0, 'MNG', 'Mongolia'),
(117, uuid(), 0, 'IND', 'India'),
(118, uuid(), 0, 'DOM', 'Dominican Republic'),
(119, uuid(), 0, 'ATG', 'Antigua & Barbuda'),
(120, uuid(), 0, 'NAM', 'Namibia'),
(121, uuid(), 0, 'GBR', 'United Kingdom'),
(122, uuid(), 0, 'BEL', 'Belgium'),
(123, uuid(), 0, 'BOL', 'Bolivia'),
(124, uuid(), 0, 'POL', 'Poland'),
(125, uuid(), 0, 'LKA', 'Sri Lanka'),
(126, uuid(), 0, 'CXR', 'Christmas Island'),
(127, uuid(), 0, 'GUY', 'Guyana'),
(128, uuid(), 0, 'GEO', 'Georgia'),
(129, uuid(), 0, 'LTU', 'Lithuania'),
(130, uuid(), 0, 'PCN', 'Pitcairn Islands'),
(131, uuid(), 0, 'KNA', 'St. Kitts & Nevis'),
(132, uuid(), 0, 'AFG', 'Afghanistan'),
(133, uuid(), 0, 'ESH', 'Western Sahara'),
(134, uuid(), 0, 'MOZ', 'Mozambique'),
(135, uuid(), 0, 'MAC', 'Macau SAR China'),
(136, uuid(), 0, 'PAN', 'Panama'),
(137, uuid(), 0, 'MEX', 'Mexico'),
(138, uuid(), 0, 'LBY', 'Libya'),
(139, uuid(), 0, 'BLM', 'St. Barthélemy'),
(140, uuid(), 0, 'VUT', 'Vanuatu'),
(141, uuid(), 0, 'CUW', 'Curaçao'),
(142, uuid(), 0, 'SLB', 'Solomon Islands'),
(143, uuid(), 0, 'BLR', 'Belarus'),
(144, uuid(), 0, 'ABW', 'Aruba'),
(145, uuid(), 0, 'TCD', 'Chad'),
(146, uuid(), 0, 'CMR', 'Cameroon'),
(147, uuid(), 0, 'MDG', 'Madagascar'),
(148, uuid(), 0, 'KWT', 'Kuwait'),
(149, uuid(), 0, 'MYT', 'Mayotte'),
(150, uuid(), 0, 'MLI', 'Mali'),
(151, uuid(), 0, 'BLZ', 'Belize'),
(152, uuid(), 0, 'SRB', 'Serbia'),
(153, uuid(), 0, 'IDN', 'Indonesia'),
(154, uuid(), 0, 'GTM', 'Guatemala'),
(155, uuid(), 0, 'EST', 'Estonia'),
(156, uuid(), 0, 'BDI', 'Burundi'),
(157, uuid(), 0, 'FJI', 'Fiji'),
(158, uuid(), 0, 'BRN', 'Brunei'),
(159, uuid(), 0, 'ESP', 'Spain'),
(160, uuid(), 0, 'HTI', 'Haiti'),
(161, uuid(), 0, 'MNE', 'Montenegro'),
(162, uuid(), 0, 'SVK', 'Slovakia'),
(163, uuid(), 0, 'VAT', 'Vatican City'),
(164, uuid(), 0, 'MSR', 'Montserrat'),
(165, uuid(), 0, 'NIC', 'Nicaragua'),
(166, uuid(), 0, 'NFK', 'Norfolk Island'),
(167, uuid(), 0, 'ASM', 'American Samoa'),
(168, uuid(), 0, 'SWZ', 'Swaziland'),
(169, uuid(), 0, 'ALB', 'Albania'),
(170, uuid(), 0, 'DJI', 'Djibouti'),
(171, uuid(), 0, 'ISL', 'Iceland'),
(172, uuid(), 0, 'JOR', 'Jordan'),
(173, uuid(), 0, 'CHL', 'Chile'),
(174, uuid(), 0, 'MHL', 'Marshall Islands'),
(175, uuid(), 0, 'BRA', 'Brazil'),
(176, uuid(), 0, 'SEN', 'Senegal'),
(177, uuid(), 0, 'MUS', 'Mauritius'),
(178, uuid(), 0, 'IOT', 'British Indian Ocean Territory'),
(179, uuid(), 0, 'WSM', 'Samoa'),
(180, uuid(), 0, 'VEN', 'Venezuela'),
(181, uuid(), 0, 'NRU', 'Nauru'),
(182, uuid(), 0, 'PYF', 'French Polynesia'),
(183, uuid(), 0, 'TTO', 'Trinidad & Tobago'),
(184, uuid(), 0, 'GAB', 'Gabon'),
(185, uuid(), 0, 'LAO', 'Laos'),
(186, uuid(), 0, 'AGO', 'Angola'),
(187, uuid(), 0, 'VCT', 'St. Vincent & Grenadines'),
(188, uuid(), 0, 'TON', 'Tonga'),
(189, uuid(), 0, 'BHR', 'Bahrain'),
(190, uuid(), 0, 'KIR', 'Kiribati'),
(191, uuid(), 0, 'ECU', 'Ecuador'),
(192, uuid(), 0, 'LBR', 'Liberia'),
(193, uuid(), 0, 'JEY', 'Jersey'),
(194, uuid(), 0, 'GNB', 'Guinea-Bissau'),
(195, uuid(), 0, 'TUR', 'Turkey'),
(196, uuid(), 0, 'DNK', 'Denmark'),
(197, uuid(), 0, 'CPV', 'Cape Verde'),
(198, uuid(), 0, 'GIB', 'Gibraltar'),
(199, uuid(), 0, 'PSE', 'Palestinian Territories'),
(200, uuid(), 0, 'FLK', 'Falkland Islands'),
(201, uuid(), 0, 'CZE', 'Czechia'),
(202, uuid(), 0, 'ETH', 'Ethiopia'),
(203, uuid(), 0, 'LSO', 'Lesotho'),
(204, uuid(), 0, 'ROU', 'Romania'),
(205, uuid(), 0, 'PRY', 'Paraguay'),
(206, uuid(), 0, 'RUS', 'Russia'),
(207, uuid(), 0, 'CYP', 'Cyprus'),
(208, uuid(), 0, 'NLD', 'Netherlands'),
(209, uuid(), 0, 'COD', 'Congo - Kinshasa'),
(210, uuid(), 0, 'PLW', 'Palau'),
(211, uuid(), 0, 'BHS', 'Bahamas'),
(212, uuid(), 0, 'MWI', 'Malawi'),
(213, uuid(), 0, 'MKD', 'Macedonia'),
(214, uuid(), 0, 'SLE', 'Sierra Leone'),
(215, uuid(), 0, 'MRT', 'Mauritania'),
(216, uuid(), 0, 'GRC', 'Greece'),
(217, uuid(), 0, 'KOR', 'South Korea'),
(218, uuid(), 0, 'CAF', 'Central African Republic'),
(219, uuid(), 0, 'CUB', 'Cuba'),
(220, uuid(), 0, 'MMR', 'Myanmar (Burma)'),
(221, uuid(), 0, 'ERI', 'Eritrea'),
(222, uuid(), 0, 'COM', 'Comoros'),
(223, uuid(), 0, 'SXM', 'Sint Maarten'),
(224, uuid(), 0, 'SOM', 'Somalia'),
(225, uuid(), 0, 'NPL', 'Nepal'),
(226, uuid(), 0, 'GHA', 'Ghana'),
(227, uuid(), 0, 'NER', 'Niger'),
(228, uuid(), 0, 'AND', 'Andorra'),
(229, uuid(), 0, 'PRT', 'Portugal'),
(230, uuid(), 0, 'NIU', 'Niue'),
(231, uuid(), 0, 'CHN', 'China'),
(232, uuid(), 0, 'SUR', 'Suriname'),
(233, uuid(), 0, 'BGD', 'Bangladesh'),
(234, uuid(), 0, 'VNM', 'Vietnam'),
(235, uuid(), 0, 'AUT', 'Austria'),
(236, uuid(), 0, 'STP', 'São Tomé & Príncipe'),
(237, uuid(), 0, 'EGY', 'Egypt'),
(238, uuid(), 0, 'CHE', 'Switzerland'),
(239, uuid(), 0, 'URY', 'Uruguay'),
(240, uuid(), 0, 'NGA', 'Nigeria'),
(241, uuid(), 0, 'UMI', 'U.S. Outlying Islands'),
(242, uuid(), 0, 'ARE', 'United Arab Emirates'),
(243, uuid(), 0, 'BIH', 'Bosnia & Herzegovina'),
(244, uuid(), 0, 'TST', 'Test Country');

INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_country_id, destination_location, end_date, start_date, advance_payment) VALUES (1, uuid(), 0, 1, 3, 'Sign new contract for new macbooks', 'CREATED', 244, 'Cupertino', '2019-05-03T10:12:00', '2019-06-04T18:30:00', null);
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_country_id, destination_location, end_date, start_date, advance_payment) VALUES (2, uuid(), 0, 1, 1, 'Webflux training', 'CHECKED', 244, 'Warsaw', '2019-02-01T08:13:00', '2019-02-01T17:00:00', null);
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_country_id, destination_location, end_date, start_date, advance_payment) VALUES (3, uuid(), 0, 1, 2, 'Delegation-Assistant training', 'APPROVED', 244, 'Lodz', '2019-04-24T11:00:00', '2019-04-24T012:00:00', 150);
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_country_id, destination_location, end_date, start_date, advance_payment) VALUES (4, uuid(), 0, 1, 1, 'Vodafone demo meeting', 'FINALIZED', 244, 'Jerusalem', '2019-01-04T12:30:00', '2019-01-18T13:05:00', null);
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_country_id, destination_location, end_date, start_date, advance_payment) VALUES (5, uuid(), 0, 1, 3, 'SRE team meeting', 'PREPARED', 244, 'Tokio', '2019-03-03T09:15:00', '2019-03-15T017:20:00', null);
INSERT INTO delegation (id, uuid, version, checklist_id, delegated_employee_id, delegation_objective, delegation_status, destination_country_id, destination_location, end_date, start_date, advance_payment) VALUES (6, uuid(), 0, 1, 1, 'Romania DC audit', 'NEEDS_WORK', 244, 'Bucharest', '2019-02-22T21:15:00', '2019-02-27T08:30:00', null);

INSERT INTO diet (delegation_id, uuid, version, per_diem, currency) VALUES (1, uuid(), 0, 59, 'USD');
INSERT INTO diet (delegation_id, uuid, version, per_diem, currency) VALUES (2, uuid(), 0, 45, 'PLN');
INSERT INTO diet (delegation_id, uuid, version, per_diem, currency) VALUES (3, uuid(), 0, 45, 'PLN');
INSERT INTO diet (delegation_id, uuid, version, per_diem, currency) VALUES (4, uuid(), 0, 50, 'EUR');
INSERT INTO diet (delegation_id, uuid, version, per_diem, currency) VALUES (5, uuid(), 0, 7532, 'JPY');
INSERT INTO diet (delegation_id, uuid, version, per_diem, currency) VALUES (6, uuid(), 0, 38, 'EUR');

INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (1, uuid(), 0, 'PLN', '2019-02-02', 'Ticket for plane', '120.25', 'CREDIT_CARD', 3);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (2, uuid(), 0, 'EUR', '2019-04-24', 'Ticket for train', '45.37', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (3, uuid(), 0, 'NIS', '2019-01-06', 'Dinner', '12.25', 'CREDIT_CARD', 4);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (4, uuid(), 0, 'JPY', '2019-03-04', 'Ramen', '840', 'CASH', 5);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (5, uuid(), 0, 'PLN', '2019-03-12', 'Taxi', '20.12', 'CASH', 5);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (6, uuid(), 0, 'RON', '2019-02-24', 'Ticket for train', '10.25', 'CREDIT_CARD', 6);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (7, uuid(), 0, 'JPY', '2019-11-25', 'knew further along copper', '6.87', 'CREDIT_CARD', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (8, uuid(), 0, 'JPY', '2019-02-20', 'although grade well describe', '9.26', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (9, uuid(), 0, 'NIS', '2019-09-26', 'barn useful public living', '70.33', 'CASH', 3);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (10, uuid(), 0, 'JPY', '2019-03-17', 'leaf deer during fresh', '85.97', 'CREDIT_CARD', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (11, uuid(), 0, 'EUR', '2019-07-14', 'out weigh barn dear', '71.75', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (12, uuid(), 0, 'USD', '2019-01-22', 'lonely sport note valuable', '84.22', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (13, uuid(), 0, 'NIS', '2019-04-20', 'characteristic musical piece related', '10.55', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (14, uuid(), 0, 'JPY', '2019-02-23', 'vast difficult spoken saw', '70.72', 'CREDIT_CARD', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (15, uuid(), 0, 'NIS', '2019-02-15', 'aboard tribe street tail', '38.16', 'CREDIT_CARD', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (16, uuid(), 0, 'EUR', '2019-03-23', 'escape parts huge stems', '65.52', 'CREDIT_CARD', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (17, uuid(), 0, 'JPY', '2019-06-17', 'shot answer article wife', '90.96', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (18, uuid(), 0, 'USD', '2019-10-21', 'mixture light cry practical', '97.47', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (19, uuid(), 0, 'NIS', '2019-07-20', 'using wife dust move', '12.99', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (20, uuid(), 0, 'JPY', '2019-03-13', 'dust them silly sheep', '96.10', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (21, uuid(), 0, 'NIS', '2019-03-23', 'escape variety same police', '50.50', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (22, uuid(), 0, 'USD', '2019-04-28', 'parent accept nice grandmother', '16.60', 'CASH', 2);
INSERT INTO expense (id, uuid, version, expense_currency, expense_date, expense_name, expense_value, payment_type, delegation_id) VALUES (23, uuid(), 0, 'EUR', '2019-01-14', 'express cast elephant fix', '48.96', 'CREDIT_CARD', 2);

INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (1, uuid(), 0, 'example.png', 'paragon.png', 1);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (2, uuid(), 0, 'example.png', 'paragon.png', 2);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (3, uuid(), 0, 'example.png', 'paragon.png', 3);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (4, uuid(), 0, 'example.png', 'paragon.png', 4);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (5, uuid(), 0, 'example.png', 'paragon.png', 5);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (6, uuid(), 0, 'example.png', 'paragon.png', 6);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (7, uuid(), 0, 'example.png', 'paragon.png', 7);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (8, uuid(), 0, 'example.png', 'paragon.png', 8);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (9, uuid(), 0, 'example.png', 'paragon.png', 9);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (10, uuid(), 0, 'example.png', 'paragon.png', 10);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (11, uuid(), 0, 'example.png', 'paragon.png', 11);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (12, uuid(), 0, 'example.png', 'paragon.png', 12);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (13, uuid(), 0, 'example.png', 'paragon.png', 13);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (14, uuid(), 0, 'example.png', 'paragon.png', 14);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (15, uuid(), 0, 'example.png', 'paragon.png', 15);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (16, uuid(), 0, 'example.png', 'paragon.png', 16);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (17, uuid(), 0, 'example.png', 'paragon.png', 17);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (18, uuid(), 0, 'example.png', 'paragon.png', 18);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (19, uuid(), 0, 'example.png', 'paragon.png', 19);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (20, uuid(), 0, 'example.png', 'paragon.png', 20);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (21, uuid(), 0, 'example.png', 'paragon.png', 21);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (22, uuid(), 0, 'example.png', 'paragon.png', 22);
INSERT INTO file (id, uuid, version, file_path, user_filename, expense_id) VALUES (23, uuid(), 0, 'example.png', 'paragon.png', 23);