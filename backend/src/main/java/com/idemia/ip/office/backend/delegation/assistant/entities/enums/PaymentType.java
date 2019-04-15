package com.idemia.ip.office.backend.delegation.assistant.entities.enums;

public enum PaymentType {
    CASH("CASH"),
    CREDIT_CARD("CREDIT_CARD");

    private String value;

    private PaymentType(String value) {
        this.value = value;
    }
}
