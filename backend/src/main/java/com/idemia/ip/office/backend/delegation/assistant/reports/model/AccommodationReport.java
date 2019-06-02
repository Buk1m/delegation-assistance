package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationReport {

    private Long id;

    private LocalDate checkInDate;

    private LocalTime checkInTime;

    private LocalDate checkOutDate;

    private LocalTime checkOutTime;

    private String hotelName;
}
