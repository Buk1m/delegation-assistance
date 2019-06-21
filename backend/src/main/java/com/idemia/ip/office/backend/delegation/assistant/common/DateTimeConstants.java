package com.idemia.ip.office.backend.delegation.assistant.common;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

public interface DateTimeConstants {

    String DATE_FORMAT_STRING = "yyyy-MM-dd";
    String TIME_FORMAT_STRING = "HH:mm:ss";
    String DATE_TIME_FORMAT_STRING = "yyyy-MM-dd'T'HH:mm:ss";
    String DATE_TIME_REPORT_FORMAT_STRING = "dd.MM.yyyy HH:mm";
    String DATE_TIME_FILE_NAME_FORMAT_STRING = "yyyy-MM-dd_HH-mm-ss";

    DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern(DATE_FORMAT_STRING);
    DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_STRING);
    DateTimeFormatter DATE_TIME_REPORT_FORMAT = DateTimeFormatter.ofPattern(DATE_TIME_REPORT_FORMAT_STRING);
    DateTimeFormatter DATE_TIME_FILE_NAME_FORMAT = DateTimeFormatter.ofPattern(DATE_TIME_FILE_NAME_FORMAT_STRING);
    DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern(TIME_FORMAT_STRING);

    Integer HOURS_PER_DAY_INT = 24;
    Long MILLIS_PER_DAY = TimeUnit.DAYS.toMillis(1L);
    Long MILLIS_PER_HOUR = TimeUnit.HOURS.toMillis(1L);
    BigDecimal HOURS_PER_DAY = new BigDecimal(HOURS_PER_DAY_INT);
}
