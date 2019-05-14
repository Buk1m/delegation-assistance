package com.idemia.ip.office.backend.delegation.assistant.countries.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
