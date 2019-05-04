package com.idemia.ip.office.backend.delegation.assistant.common;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PageMapper {
    private final ModelMapper modelMapper;

    public PageMapper(ModelMapper modelMapper) {this.modelMapper = modelMapper;}

    public <T, U> PageDto<T> mapPageToDto(Page<U> page, Class<T> tClass) {
        List<T> mappedContent = page.get()
                .map(c -> modelMapper.map(c, tClass))
                .collect(Collectors.toList());

        return new PageDto<>(page.getTotalElements(), mappedContent);
    }
}
