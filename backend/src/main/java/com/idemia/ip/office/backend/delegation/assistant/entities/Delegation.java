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

    @OneToMany(mappedBy = "delegation", fetch = EAGER, cascade = ALL)
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(mappedBy = "delegation", fetch = EAGER, cascade = ALL)
    @Fetch(FetchMode.SELECT)
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(mappedBy = "delegation", fetch = EAGER, cascade = ALL)
    @Fetch(FetchMode.SELECT)
    private List<Accommodation> accommodations = new ArrayList<>();

    @JoinColumn(name = "checklist_id", nullable = false)
    @OneToOne(cascade = {PERSIST, REMOVE, REFRESH, DETACH})
    private Checklist checklist;

    @OneToOne(mappedBy = "delegation", cascade = {PERSIST, REMOVE, REFRESH, DETACH})
    private Diet diet;

    @OneToOne(mappedBy = "delegation", cascade = {PERSIST, REMOVE, REFRESH, DETACH})
    private Meals meals;

    public void addExpense(Expense expense) {
        expense.setDelegation(this);
        expenses.add(expense);
    }

    public void addFlight(Flight flight) {
        flight.setDelegation(this);
        flights.add(flight);
    }

    public void addAccommodation(Accommodation accommodation) {
        accommodation.setDelegation(this);
        accommodations.add(accommodation);
    }

    /**
     * Sets a bidirectional association between Delegation and Diet.
     */
    public void setDiet(Diet diet) {
        diet.setDelegation(this);
        this.diet = diet;
    }

    /**
     * Sets a bidirectional association between Delegation and Meals.
     */
    public void setMeals(Meals meals) {
        meals.setDelegation(this);
        this.meals = meals;
    }
}
