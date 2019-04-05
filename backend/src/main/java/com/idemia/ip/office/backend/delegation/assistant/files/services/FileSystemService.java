package com.idemia.ip.office.backend.delegation.assistant.files.services;

import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

public interface FileSystemService {
    Mono<Void> save(FilePart file, String filePath);
}
