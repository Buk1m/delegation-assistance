package com.idemia.ip.office.backend.delegation.assistant.entities.enums;

public enum DelegationStatus {
    CREATED("CREATED"),
    PREPARED("PREPARED"),
    NEEDS_WORK("NEEDS_WORK"),
    CHECKED("CHECKED"),
    APPROVED("APPROVED"),
    FINALIZED("FINALIZED");

    private String value;

    private DelegationStatus(String value) {
        this.value = value;
    }
}
