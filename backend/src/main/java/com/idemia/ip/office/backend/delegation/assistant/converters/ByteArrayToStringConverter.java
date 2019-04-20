package com.idemia.ip.office.backend.delegation.assistant.converters;

import org.modelmapper.Converter;

import java.util.Base64;

public class ByteArrayToStringConverter {
    public static Converter<byte[], String> byteArrayToStringConverter = context ->
            context.getSource() == null ? null : Base64
                    .getEncoder()
                    .encodeToString(context.getSource());
}
