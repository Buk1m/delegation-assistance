package com.idemia.ip.office.backend.delegation.assistant.utils;

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Method;
import java.time.LocalDateTime;

public class DatesValidator implements ConstraintValidator<ValidateDates, Object> {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationServiceImpl.class);

    private String start;
    private String end;

    @Override
    public void initialize(ValidateDates constraintAnnotation) {
        start = constraintAnnotation.start();
        end = constraintAnnotation.end();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        try {
            Class aClass = o.getClass();
            Method startGetter = aClass.getMethod("get" + StringUtils.capitalize(start));
            Object startGetterResult = startGetter.invoke(o);
            Method endGetter = aClass.getMethod("get" + StringUtils.capitalize(end));
            Object endGetterResult = endGetter.invoke(o);
            if (!(startGetterResult instanceof LocalDateTime) || !(endGetterResult instanceof LocalDateTime)) {
                return false;
            } else {
                LocalDateTime startDate = (LocalDateTime) startGetterResult;
                LocalDateTime endDate = (LocalDateTime) endGetterResult;
                return startDate.isBefore((endDate));
            }
        } catch (Exception e) {
            LOG.info("Invalid incoming dates: {} and {}", start, end, e);
        }
        return false;
    }
}
