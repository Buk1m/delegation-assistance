package com.idemia.ip.office.backend.delegation.assistant.files.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.File;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface FileService {
    Flux<File> addFiles(List<FilePart> attachments, Long userId, Long delegationId);

    Mono<UserFile> getFile(Long fileId);
}
