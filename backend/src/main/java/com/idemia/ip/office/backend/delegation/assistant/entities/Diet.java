package com.idemia.ip.office.backend.delegation.assistant.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import java.math.BigDecimal;
import java.util.Currency;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Diet extends BaseEntity {

    @Id
    private Long id;

    @Column(nullable = false)
    private BigDecimal perDiem;

    @Column(nullable = false)
    private Currency currency;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(unique = true, updatable = false, nullable = false)
    private Delegation delegation;

    public String getCurrency() {
        return currency.getCurrencyCode();
    }

    public void setCurrency(String dietCurrency) {
        this.currency = Currency.getInstance(dietCurrency);
    }
}
