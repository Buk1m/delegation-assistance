package com.idemia.ip.office.backend.delegation.assistant.expenses.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("select e.id " +
            "from Delegation d " +
            "inner join d.expenses e " +
            "where d = :delegation")
    Page<Long> findIdsBy(@Param("delegation") Delegation delegation,
            Pageable pageable);

    @Query("select distinct e from Expense e join fetch e.files where e.id in :ids")
    List<Expense> getExpensesWithFilesById(@Param("ids") List<Long> ids, Sort sort);
}
