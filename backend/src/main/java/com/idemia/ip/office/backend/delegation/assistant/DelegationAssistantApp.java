package com.idemia.ip.office.backend.delegation.assistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DelegationAssistantApp {

    public static void main(String[] args) {
        SpringApplication.run(DelegationAssistantApp.class, args);
    }
}
