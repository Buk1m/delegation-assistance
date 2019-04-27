package com.idemia.ip.office.backend.delegation.assistant.files.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileDto {
        private Long id;
        @JsonProperty("filename")
        private String userFilename;
}
