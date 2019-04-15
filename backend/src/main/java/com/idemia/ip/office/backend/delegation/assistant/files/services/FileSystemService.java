package com.idemia.ip.office.backend.delegation.assistant.files.services;

import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

public interface FileSystemService {
    Mono<String> save(FilePart file, String path);
}
