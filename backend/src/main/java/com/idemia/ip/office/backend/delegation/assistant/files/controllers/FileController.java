package com.idemia.ip.office.backend.delegation.assistant.files.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.services.DelegationService;
import com.idemia.ip.office.backend.delegation.assistant.files.dtos.UserFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;
import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM_VALUE;

@RestController
public class FileController {
    private static final Logger LOG = LoggerFactory.getLogger(FileController.class);

    private final DelegationService delegationService;

    public FileController(DelegationService delegationService) {
        this.delegationService = delegationService;
    }

    @GetMapping(value = "/delegations/{delegationId}/expenses/{expenseId}/files/{fileId}",
            produces = APPLICATION_OCTET_STREAM_VALUE)
    public Mono<ResponseEntity<Resource>> getFile(Authentication authentication,
            @PathVariable Long delegationId,
            @PathVariable Long expenseId,
            @PathVariable Long fileId) {
        LOG.info("User: {} requested file with id: {}", authentication.getName(), fileId);
        return delegationService.getFile(delegationId, expenseId, fileId, authentication)
                .map(this::mapUserFileToResponseEntity);
    }

    private ResponseEntity<Resource> mapUserFileToResponseEntity(UserFile userFile) {
        return ResponseEntity.ok()
                .header(CONTENT_DISPOSITION, "attachment; filename=" + userFile.getUserFileName())
                .contentType(APPLICATION_OCTET_STREAM)
                .body(userFile.getFile());
    }
}
