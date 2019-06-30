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
If you have the required software and you've cloned this repository, navigate to the root project directory and:
1. Delete from application-dev.properties.sample appendix `.sample`
2. Run ```mvn spring-boot:run -Dspring-boot.run.profiles=dev```

## Example accounts
List of test accounts:
- login: employee, password: pass1 (ROLE_EMPLOYEE)
- login: manager, password: pass2 (ROLE_TRAVEL_MANAGER)
- login: approver, password: pass3 (ROLE_APPROVER)
- login: accountant, password: pass4 (ROLE_ACCOUNTANT)
- login: employee2, password: pass1 (ROLE_EMPLOYEE)
- login: manager2, password: pass2 (ROLE_TRAVEL_MANAGER)
- login: approver2, password: pass3 (ROLE_APPROVER)
- login: accountant2, password: pass4 (ROLE_ACCOUNTANT)
- login: employeemanager, password: pass5 (ROLE_EMPLOYEE, ROLE_TRAVEL_MANAGER)
- login: employeeapprover, password: pass6 (ROLE_EMPLOYEE, ROLE_APPROVER)

## Docker
Before starting Docker should be installed and launched on your OS. \
To create Docker image you should run the following command: `mvn dockerfile:build`. \
Please remember to build the project first using `mvn clean install`.

After building the image it's name will be outputted, for example: `delegation-assistant:0.0.1`. \
Container can be run using following command `docker run -v "path/uploads:/opt/app/uploads" -p 8080:8080 delegation-assistant:0.0.1`. 
Where `path` means full path to `backend` directory.
1. When you are using **windows** you can use this command `docker run -v "%cd%/uploads:/opt/app/uploads" -p 8080:8080 delegation-assistant:0.0.1`
2. When you are using **mac** or **linux** `docker run -v "$(pwd)/uploads:/opt/app/uploads" -p 8080:8080 delegation-assistant:0.0.1`
Application will be available on your localhost's port 8080.
