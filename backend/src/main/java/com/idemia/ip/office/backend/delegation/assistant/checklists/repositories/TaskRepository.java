package com.idemia.ip.office.backend.delegation.assistant.checklists.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
