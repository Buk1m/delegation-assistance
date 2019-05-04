package com.idemia.ip.office.backend.delegation.assistant.files.services;

import com.idemia.ip.office.backend.delegation.assistant.exceptions.EntityNotFoundException;
import com.idemia.ip.office.backend.delegation.assistant.files.configuration.FileExceptionProperties;
import com.idemia.ip.office.backend.delegation.assistant.files.configuration.FileProperties;
import com.idemia.ip.office.backend.delegation.assistant.files.exceptions.FileException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Path;

@Service
public class FileSystemServiceImpl implements FileSystemService {
    private static final Logger LOG = LoggerFactory.getLogger(FileSystemServiceImpl.class);

    private final FileExceptionProperties fileExceptionProperties;
    private final FileProperties fileProperties;

    public FileSystemServiceImpl(FileExceptionProperties fileExceptionProperties,
            FileProperties fileProperties) {
        this.fileExceptionProperties = fileExceptionProperties;
        this.fileProperties = fileProperties;
        tryCreateBaseDir(this.fileProperties);
    }

    @Override
    public Mono<String> save(FilePart file, String filePath) {
        Path path = Path.of(fileProperties.getBasePath(), filePath);
        File fileSystemFile = path.toFile();
        if (fileSystemFile.exists()) {
            throw getFileAlreadyExistsException(filePath, file.filename());
        }
        fileSystemFile.getParentFile().mkdirs();
        return file.transferTo(path)
                .doOnError(IOException.class, e -> {
                    LOG.warn("Couldn't save file, Path: {}, User's filename: {}", filePath, file.filename(), e);
                    throw new FileException("Couldn't save provided file",
                            fileExceptionProperties.getCouldNotSaveFile());
                })
                .thenReturn(filePath);
    }

    @Override
    public Mono<Resource> getFile(com.idemia.ip.office.backend.delegation.assistant.entities.File dbFile) {
        File file = Path.of(fileProperties.getBasePath(), dbFile.getFilePath()).toFile();

        if (!file.exists()) {
            throw fileNotFoundException(dbFile.getFilePath());
        }

        return Mono.just(new FileSystemResource(file));
    }

    private RuntimeException getFileAlreadyExistsException(String filePath, String filename) {
        FileAlreadyExistsException exception = new FileAlreadyExistsException(filePath,
                filename,
                "File with provided field already exists");
        return new RuntimeException(exception);
    }

    private void tryCreateBaseDir(FileProperties fileProperties) {
        Path.of(fileProperties.getBasePath())
                .toAbsolutePath()
                .toFile()
                .mkdirs();
    }

    private EntityNotFoundException fileNotFoundException(String path) {
        LOG.error("Couldn't find file in filesystem on path: {}", path);
        return new EntityNotFoundException(
                "File not found.",
                fileExceptionProperties.getFileNotFound(),
                File.class
        );
    }
}
