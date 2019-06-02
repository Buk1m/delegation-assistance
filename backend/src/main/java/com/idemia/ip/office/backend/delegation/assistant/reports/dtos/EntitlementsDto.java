package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntitlementsDto {

    private String perDiem;

    private String total;

    private String breakfast;

    private String lunches;

    private String dinners;
}
