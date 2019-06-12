package com.idemia.ip.office.backend.delegation.assistant.utils;

public class BeanUtils {

    private BeanUtils() { }

    public static String getDefaultBeanName(Class<?> beanClass) {
        String beanName = beanClass.getSimpleName();
        return Character.toLowerCase(beanName.charAt(0)) + beanName.substring(1);
    }
}
