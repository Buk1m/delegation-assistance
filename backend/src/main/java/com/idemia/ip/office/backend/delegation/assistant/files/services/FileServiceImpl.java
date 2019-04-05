package com.idemia.ip.office.backend.delegation.assistant.files.services;

import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class FileServiceImpl implements FileService {
    private final FileSystemService fileSystemService;

    public FileServiceImpl(FileSystemService fileSystemService) {
        this.fileSystemService = fileSystemService;
    }

    @Override
    public Mono<Void> addFiles(Map<String, FilePart> newFiles) {
        return Flux.fromIterable(newFiles.entrySet())
                .map(file -> fileSystemService.save(file.getValue(), file.getKey()))
                .collectList()
                .then();
    }
}
