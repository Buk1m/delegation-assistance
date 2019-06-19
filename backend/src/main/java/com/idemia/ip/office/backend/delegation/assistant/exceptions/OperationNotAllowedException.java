package com.idemia.ip.office.backend.delegation.assistant.exceptions;

import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.Getter;

public class OperationNotAllowedException extends ApplicationException {

    @Getter
    private final DelegationStatus delegationStatus;

    public OperationNotAllowedException(String errorCode, DelegationStatus delegationStatus) {
        super(errorCode);
        this.delegationStatus = delegationStatus;
    }

    public OperationNotAllowedException(String message, String errorCode, DelegationStatus delegationStatus) {
        super(message, errorCode);
        this.delegationStatus = delegationStatus;
    }

    public OperationNotAllowedException(Throwable cause, String errorCode, DelegationStatus delegationStatus) {
        super(cause, errorCode);
        this.delegationStatus = delegationStatus;
    }

    public OperationNotAllowedException(String message,
            Throwable cause,
            String errorCode,
            DelegationStatus delegationStatus) {
        super(message, cause, errorCode);
        this.delegationStatus = delegationStatus;
    }
}
