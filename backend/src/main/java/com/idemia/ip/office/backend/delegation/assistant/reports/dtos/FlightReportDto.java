package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.DATE_FORMAT_STRING;
import static com.idemia.ip.office.backend.delegation.assistant.common.DateTimeConstants.TIME_FORMAT_STRING;
import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;
import static org.springframework.format.annotation.DateTimeFormat.ISO.TIME;

@Getter
@Setter
public class FlightReportDto {

    private Long id;

    @JsonProperty("from")
    private String departurePlace;

    @JsonProperty("to")
    private String arrivalPlace;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT_STRING)
    private LocalDate departureDate;

    @DateTimeFormat(iso = TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT_STRING)
    private LocalTime departureTime;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT_STRING)
    private LocalDate arrivalDate;

    @DateTimeFormat(iso = TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT_STRING)
    private LocalTime arrivalTime;
}
