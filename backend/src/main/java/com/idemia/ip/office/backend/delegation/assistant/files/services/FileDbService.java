package com.idemia.ip.office.backend.delegation.assistant.files.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.File;
import reactor.core.publisher.Mono;

public interface FileDbService {

    Mono<File> getFile(Long fileId);
}
