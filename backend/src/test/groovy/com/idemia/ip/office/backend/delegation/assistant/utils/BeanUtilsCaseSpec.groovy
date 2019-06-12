package com.idemia.ip.office.backend.delegation.assistant.utils

import spock.lang.Specification;

class BeanUtilsCaseSpec extends Specification {

    def 'should return correct default bean name for #beanClass'() {
        when:
            String beanName = BeanUtils.getDefaultBeanName(beanClass as Class<?>)

        then:
            beanName == resultBeanName

        where:
            beanClass        | resultBeanName
            TestClass.class  | "testClass"
            testClass2.class | "testClass2"
            Testclass3.class | "testclass3"
            testClass4.class | "testClass4"


    }

    private static class TestClass {}

    private static class testClass2 {}

    private static class Testclass3 {}

    private static class testClass4 {}
}
