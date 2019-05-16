package com.idemia.ip.office.backend.delegation.assistant.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Meals extends BaseEntity {

    @Id
    private Long id;

    @Column(nullable = false)
    private Long breakfasts;

    @Column(nullable = false)
    private Long lunches;

    @Column(nullable = false)
    private Long dinners;

    @MapsId
    @OneToOne(fetch = LAZY)
    @JoinColumn(unique = true, updatable = false, nullable = false)
    private Delegation delegation;
}
