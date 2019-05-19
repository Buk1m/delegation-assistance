package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class FlightReport {

    private String departurePlace;

    private String arrivalPlace;

    private LocalDate departureDate;

    private LocalTime departureTime;

    private LocalDate arrivalDate;

    private LocalTime arrivalTime;
}
