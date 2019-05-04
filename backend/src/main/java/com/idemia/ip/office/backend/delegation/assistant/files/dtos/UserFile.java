package com.idemia.ip.office.backend.delegation.assistant.files.dtos;

import com.idemia.ip.office.backend.delegation.assistant.entities.BaseEntity;
import lombok.Getter;
import org.springframework.core.io.Resource;

@Getter
public class UserFile extends BaseEntity {
    private Resource file;
    private String userFileName;

    public UserFile(Resource file, String userFileName) {
        this.file = file;
        this.userFileName = userFileName;
    }
}
