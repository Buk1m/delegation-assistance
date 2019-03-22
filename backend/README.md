# Delegation Assistant - backend application.
This directory contains the backend project that provides the REST API for frontend projects.

## Contents
- [Required software](#required-software)
- [Start Up](#start-up)
- [Example accounts](#example-accounts)

## Required software

Here's the software you'll need before you start running the application.
- JDK 11
- Maven (>=3.0.5)

## Start up
If you have the required software and you've cloned this repository, navigate to the root project directory and run:
```mvn spring-boot:run```

## Example accounts
List of test accounts:
- login: employee, password: pass1 (ROLE_EMPLOYEE)
- login: manager, password: pass2 (ROLE_TRAVEL_MANAGER)
- login: approver, password: pass3 (ROLE_APPROVER)
- login: accountant, password: pass4 (ROLE_ACCOUNTANT)
