package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DelegationDTO {
    @NotNull(message = "{error.message.not.null}")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @NotNull(message = "{error.message.not.null}")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    @NotBlank(message = "{error.message.field.not.blank}")
    @Size(min = 3, max = 3, message = "{error.message.size}")
    private String destinationCountryISO3;
    @NotBlank(message = "{error.message.field.not.blank}")
    private String destinationLocation;
    @NotBlank(message = "{error.message.field.not.blank}")
    private String delegationObjective;
}
