package com.idemia.ip.office.backend.delegation.assistant.files.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.File;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    private final FileSystemService fileSystemService;

    public FileServiceImpl(FileSystemService fileSystemService) {
        this.fileSystemService = fileSystemService;
    }

    @Override
    public Flux<File> addFiles(List<FilePart> attachments, Long userId, Long delegationId) {
        return Flux.fromIterable(attachments)
                .flatMap(a -> createFile(a, userId, delegationId));
    }

    private Mono<File> createFile(FilePart attachment, Long userId, Long delegationId) {
        File file = parse(userId, delegationId, attachment);
        return fileSystemService.save(attachment, file.getFilePath())
                .map(s -> file);
    }

    private File parse(Long userId, Long delegationId, FilePart attachment) {
        Path filePath = createPath(userId, delegationId, attachment.filename());
        return File.builder()
                .userFilename(attachment.filename())
                .filePath(filePath.toString())
                .build();
    }

    private Path createPath(Long userId, Long delegationId, String filename) {
        String systemFilename = UUID.randomUUID().toString();
        String fileExtension = "." + FilenameUtils.getExtension(filename);

        return Path.of(userId.toString(),
                delegationId.toString(),
                systemFilename + fileExtension);
    }
}
