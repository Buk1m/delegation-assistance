package com.idemia.ip.office.backend.delegation.assistant.files.services;

import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Mono;

import java.util.Map;

public interface FileService {
    Mono<Void> addFiles(Map<String, FilePart> newFiles);
}
