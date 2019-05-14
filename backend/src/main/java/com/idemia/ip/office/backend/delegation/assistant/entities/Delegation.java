package com.idemia.ip.office.backend.delegation.assistant.entities;

import com.idemia.ip.office.backend.delegation.assistant.entities.enums.DelegationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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
import javax.persistence.OneToOne;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.DETACH;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.CascadeType.REFRESH;
import static javax.persistence.CascadeType.REMOVE;
import static javax.persistence.FetchType.EAGER;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Delegation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false)
    private String destinationLocation;

    @Column(nullable = false)
    private String delegationObjective;

    @Column
    private BigDecimal advancePayment;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private DelegationStatus delegationStatus;

    @JoinColumn(name = "destination_country_id", nullable = false)
    @ManyToOne
    private Country destinationCountry;

    @JoinColumn(name = "delegated_employee_id", nullable = false)
    @ManyToOne
    private User delegatedEmployee;

    @OneToMany(fetch = EAGER, cascade = ALL)
    @JoinColumn(name = "delegation_id")
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(fetch = EAGER, cascade = ALL)
    @JoinColumn(name = "flight_id")
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 10)
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(fetch = EAGER, cascade = ALL)
    @JoinColumn(name = "accommodation_id")
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 10)
    private List<Accommodation> accommodations = new ArrayList<>();

    @JoinColumn(name = "checklist_id", nullable = false)
    @OneToOne(cascade = {PERSIST, REMOVE, REFRESH, DETACH})
    private Checklist checklist;

    @OneToOne(mappedBy = "delegation", cascade = {PERSIST, REFRESH, DETACH})
    private Diet diet;

}
