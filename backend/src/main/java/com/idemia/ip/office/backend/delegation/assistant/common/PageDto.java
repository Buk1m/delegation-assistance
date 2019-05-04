package com.idemia.ip.office.backend.delegation.assistant.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PageDto<T> {
    private Long totalSize;
    private List<T> data;
}
