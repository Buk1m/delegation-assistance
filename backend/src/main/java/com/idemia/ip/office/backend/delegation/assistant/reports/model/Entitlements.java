package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Entitlements {

    private String perDiem;

    private BigDecimal perDiemPercentage;

    private String total;

    private BigDecimal totalPercentage;

    private String breakfast;

    private BigDecimal breakfastPercentage;

    private String lunches;

    private BigDecimal lunchesPercentage;

    private String dinners;

    private BigDecimal dinnersPercentage;
}
