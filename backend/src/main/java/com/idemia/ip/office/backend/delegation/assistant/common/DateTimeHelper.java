package com.idemia.ip.office.backend.delegation.assistant.common;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

public final class DateTimeHelper {

    private DateTimeHelper() {
    }

    public static long longHoursDurationBetweenDays(LocalDateTime startDate, LocalDateTime endDate) {
        return Duration.between(startDate, endDate).toHours();
    }

    public static Duration durationBetweenDays(LocalDateTime startDate, LocalDateTime endDate) {
        return Duration.between(startDate, endDate);
    }

    public static BigDecimal hoursDurationBetweenDays(LocalDateTime startDate, LocalDateTime endDate) {
        return new BigDecimal(longHoursDurationBetweenDays(startDate, endDate));
    }
}
