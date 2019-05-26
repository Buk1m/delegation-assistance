package com.idemia.ip.office.backend.delegation.assistant.common;

import java.time.format.DateTimeFormatter;

public interface DateTimeConstants {
    DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
}
