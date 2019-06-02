package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationReportDto {

    private Long id;


    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT_STRING)
    private LocalDate checkInDate;

    @DateTimeFormat(iso = TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT_STRING)
    private LocalTime checkInTime;

    @DateTimeFormat(iso = DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT_STRING)
    private LocalDate checkOutDate;

    @DateTimeFormat(iso = TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = TIME_FORMAT_STRING)
    private LocalTime checkOutTime;

    private String hotelName;
}
