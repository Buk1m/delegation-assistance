package com.idemia.ip.office.backend.delegation.assistant.entities.enums;

public enum DelegationStatus {
    CREATED("CREATED"),
    PREPARED("PREPARED"),
    TRAVEL_MANGER_APPROVED("TRAVEL_MANGER_APPROVED"),
    APPROVER_APPROVED("APPROVER_APPROVED"),
    RATIFIED("RATIFIED");

    private String value;

    private DelegationStatus(String value) {
        this.value = value;
    }
}
