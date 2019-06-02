package com.idemia.ip.office.backend.delegation.assistant.common;

import java.math.BigDecimal;

import static java.math.RoundingMode.HALF_UP;

public final class FinanceArithmeticStandards {

    private FinanceArithmeticStandards() {
    }

    public static final BigDecimal SHORTEST_DAY_DIEM_PART = new BigDecimal("0.33");
    public static final BigDecimal MEDIUM_DAY_DIEM_PART = new BigDecimal("0.5");

    public static final int MONEY_FLOATING_NUMBERS = 2;

    public static BigDecimal scale(BigDecimal decimal) {
        return decimal.setScale(MONEY_FLOATING_NUMBERS, HALF_UP);
    }

    public static BigDecimal exchange(BigDecimal amount, BigDecimal rate) {
        return scale(amount.multiply(rate));
    }
}
