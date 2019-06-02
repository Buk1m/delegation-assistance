package com.idemia.ip.office.backend.delegation.assistant.common;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

public interface DateTimeConstants {

    String DATE_FORMAT_STRING = "yyyy-MM-dd";
    String TIME_FORMAT_STRING = "HH:mm:ss";
    String DATE_TIME_FORMAT_STRING = "yyyy-MM-dd'T'HH:mm:ss";

    DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern(DATE_FORMAT_STRING);
    DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_STRING);
    DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern(TIME_FORMAT_STRING);

    Integer HOURS_PER_DAY_INT = 24;
    BigDecimal HOURS_PER_DAY = new BigDecimal(HOURS_PER_DAY_INT);
}
