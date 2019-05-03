package com.idemia.ip.office.backend.delegation.assistant.configuration


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component

@Component
@Configuration
@ConfigurationProperties(prefix = "passwords")
class PasswordProperties {
    private String employeePassword
    private String employeeLogin

    private String travelManagerLogin
    private String travelManagerPassword

    private String approverLogin
    private String approverPassword

    private String accountantLogin
    private String accountantPassword

    String getEmployeePassword() {
        return employeePassword
    }

    void setEmployeePassword(String employeePassword) {
        this.employeePassword = employeePassword
    }

    String getEmployeeLogin() {
        return employeeLogin
    }

    void setEmployeeLogin(String employeeLogin) {
        this.employeeLogin = employeeLogin
    }

    String getTravelManagerLogin() {
        return travelManagerLogin
    }

    void setTravelManagerLogin(String travelManagerLogin) {
        this.travelManagerLogin = travelManagerLogin
    }

    String getTravelManagerPassword() {
        return travelManagerPassword
    }

    void setTravelManagerPassword(String travelManagerPassword) {
        this.travelManagerPassword = travelManagerPassword
    }

    String getApproverLogin() {
        return approverLogin
    }

    void setApproverLogin(String approverLogin) {
        this.approverLogin = approverLogin
    }

    String getApproverPassword() {
        return approverPassword
    }

    void setApproverPassword(String approverPassword) {
        this.approverPassword = approverPassword
    }

    String getAccountantLogin() {
        return accountantLogin
    }

    void setAccountantLogin(String accountantLogin) {
        this.accountantLogin = accountantLogin
    }

    String getAccountantPassword() {
        return accountantPassword
    }

    void setAccountantPassword(String accountantPassword) {
        this.accountantPassword = accountantPassword
    }
}
