package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Currency;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiemReturns {

    private Entitlements entitlements = new Entitlements();

    private BigDecimal totalDiems;

    private Allowance allowance = new Allowance();
}
