package com.idemia.ip.office.backend.delegation.assistant.expenses.services;

import com.idemia.ip.office.backend.delegation.assistant.entities.Expense;
import com.idemia.ip.office.backend.delegation.assistant.entities.File;
import com.idemia.ip.office.backend.delegation.assistant.expenses.repositories.ExpenseRepository;
import com.idemia.ip.office.backend.delegation.assistant.files.configuration.FileProperties;
import com.idemia.ip.office.backend.delegation.assistant.files.services.FileService;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final Scheduler scheduler;
    private final FileService fileService;
    private final FileProperties fileProperties;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository,
            Scheduler scheduler,
            FileService fileService,
            FileProperties fileProperties) {
        this.expenseRepository = expenseRepository;
        this.scheduler = scheduler;
        this.fileService = fileService;
        this.fileProperties = fileProperties;
    }

    @Override
    public Mono<Void> addFiles(Expense newExpense, Long userId, Long delegationId, List<FilePart> attachments) {
        List<File> newFiles = parse(userId, delegationId, attachments);
        newExpense.getFiles().addAll(newFiles);
        Map<String, FilePart> pathAttachments = prepareAttachments(newFiles, attachments);
        return Mono.fromRunnable(() -> expenseRepository.save(newExpense))
                .flatMap(v -> fileService.addFiles(pathAttachments))
                .publishOn(scheduler);
    }

    private Map<String, FilePart> prepareAttachments(List<File> newFiles, List<FilePart> attachments) {
        Map<String, FilePart> result = new HashMap<>();
        for (File file : newFiles) {
            FilePart attachment = attachments.stream()
                    .filter(fp -> fp.filename().equals(file.getUsersFilename()))
                    .findFirst()
                    .get();
            result.put(file.getFilePath(), attachment);
        }
        return result;
    }

    private List<File> parse(Long userId, Long delegationId, List<FilePart> attachments) {
        return attachments.stream()
                .map(a -> parse(userId, delegationId, a))
                .collect(Collectors.toList());
    }

    private File parse(Long userId, Long delegationId, FilePart attachment) {
        Path filePath = createPath(userId, delegationId, attachment.filename());
        return File.builder()
                .usersFilename(attachment.filename())
                .filePath(filePath.toAbsolutePath().toString())
                .build();
    }

    private Path createPath(Long userId, Long delegationId, String filename) {
        Long timestamp = System.currentTimeMillis();
        int dotIndex = filename.lastIndexOf(".");
        String fileExtension = dotIndex != -1 ? filename.substring(dotIndex) : filename;

        return Path.of(fileProperties.getBasePath(),
                userId.toString(),
                delegationId.toString(),
                timestamp + fileExtension);
    }
}
