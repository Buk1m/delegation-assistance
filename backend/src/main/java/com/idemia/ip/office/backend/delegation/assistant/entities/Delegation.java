package com.idemia.ip.office.backend.delegation.assistant.entities;

import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Delegation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false, length = 3)
    private String destinationCountryISO3;

    @Column(nullable = false)
    private String destinationLocation;

    @Column(nullable = false)
    private String delegationObjective;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private DelegationStatus delegationStatus;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = LAZY)
    private User delegatedEmployee;

    @OneToMany(fetch = EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "delegation_id")
    @OrderBy("id")
    private List<Expense> expenses = new ArrayList<>();
}
