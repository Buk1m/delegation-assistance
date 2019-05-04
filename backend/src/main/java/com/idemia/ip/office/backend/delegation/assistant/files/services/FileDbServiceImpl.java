package com.idemia.ip.office.backend.delegation.assistant.files.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.File;
import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.files.configuration.FileExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.files.repositories.FileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class FileDbServiceImpl implements FileDbService {
    private static final Logger LOG = LoggerFactory.getLogger(FileDbServiceImpl.class);
    private final FileRepository fileRepository;
    private final FileExceptionProperties fileExceptionProperties;

    public FileDbServiceImpl(FileRepository fileRepository,
            FileExceptionProperties fileExceptionProperties) {
        this.fileRepository = fileRepository;
        this.fileExceptionProperties = fileExceptionProperties;
    }

    @Override
    public Mono<File> getFile(Long fileId) {
        return Mono.fromCallable(() -> fileRepository.findById(fileId))
                .map(f -> f.orElseThrow(() -> fileNotFoundException(fileId)));
    }

    private EntityNotFoundException fileNotFoundException(Long id) {
        LOG.info("File with id {} hasn't been found.", id);
        return new EntityNotFoundException(
                "File not found.",
                fileExceptionProperties.getFileNotFound(),
                File.class
        );
    }
}
