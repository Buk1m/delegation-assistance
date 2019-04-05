package com.idemia.ip.office.backend.delegation.assistant.expenses.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
