package com.idemia.ip.office.backend.delegation.assistant.delegations.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DelegationRepository extends JpaRepository<Delegation, Long>, DelegationRepositoryCustom {
}
