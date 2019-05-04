package com.idemia.ip.office.backend.delegation.assistant.files.repositories;

import com.idemia.ip.office.backend.delegation.assistant.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

}
