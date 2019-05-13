package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.utils.ValidateDates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ValidateDates(start = "departureDate", end = "arrivalDate", groups = OnPost.class)
public class FlightDto {

    @Null(message = "{error.message.field.blank}", groups = OnPost.class)
    private Long id;

    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    private String departurePlace;

    @NotBlank(message = "{error.message.field.not.blank}", groups = OnPost.class)
    private String arrivalPlace;

    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime departureDate;

    @NotNull(message = "{error.message.not.null}", groups = OnPost.class)
    @DateTimeFormat(iso = DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime arrivalDate;
}
