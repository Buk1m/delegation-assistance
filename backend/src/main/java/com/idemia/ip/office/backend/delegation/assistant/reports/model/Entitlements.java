package com.idemia.ip.office.backend.delegation.assistant.reports.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Entitlements {

    private String perDiemEntitlement;

    private String breakfastEntitlement;

    private String lunchesEntitlement;

    private String dinnersEntitlement;
}
