package com.idemia.ip.office.backend.delegation.assistant.countries.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CountryDto {

    private Long id;

    private String countryCode;

    private String countryName;
}
