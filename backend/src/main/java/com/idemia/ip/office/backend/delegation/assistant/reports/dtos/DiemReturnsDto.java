package com.idemia.ip.office.backend.delegation.assistant.reports.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiemReturnsDto {

    private EntitlementsDto entitlements;

    private BigDecimal totalDiems;

    private AllowanceDto allowance;
}
