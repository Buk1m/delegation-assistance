package com.idemia.ip.office.backend.delegation.assistant.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import static org.modelmapper.Conditions.isNotNull;
import static com.idemia.ip.office.backend.delegation.assistant.converters.ByteArrayToStringConverter.byteArrayToStringConverter;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    @Primary
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    @Bean
    @Qualifier("notNullProperty")
    public static ModelMapper getModelMapperPropertyConditionNotNull() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(isNotNull());
        return modelMapper;
    }

    @Bean
    @Qualifier("byteArray2Base64")
    public static ModelMapper getModelMapperConverterByteArrayToBase64() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addConverter(byteArrayToStringConverter);
        return modelMapper;
    }
}
