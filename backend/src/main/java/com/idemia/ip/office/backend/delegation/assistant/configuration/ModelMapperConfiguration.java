package com.idemia.ip.office.backend.delegation.assistant.configuration;

import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Flight;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.AccommodationReport;
import com.idemia.ip.office.backend.delegation.assistant.reports.model.FlightReport;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import static com.idemia.ip.office.backend.delegation.assistant.converters.ByteArrayToStringConverter.byteArrayToStringConverter;
import static org.modelmapper.Conditions.isNotNull;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    @Primary
    public static ModelMapper getModelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        PropertyMap<Flight, FlightReport> flightsPropertyMap = getFlightsPropertyMap();
        modelMapper.addMappings(flightsPropertyMap);
        PropertyMap<Accommodation, AccommodationReport> accommodationsReportPropertyMap = getAccommodationsPropertyMap();
        modelMapper.addMappings(accommodationsReportPropertyMap);
        modelMapper.validate();

        return modelMapper;
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

    private static PropertyMap<Accommodation, AccommodationReport> getAccommodationsPropertyMap() {
        return new PropertyMap<>() {
            @Override
            protected void configure() {
                using(ctx -> ((Accommodation) ctx.getSource()).getCheckInDate().toLocalDate()).map(source,
                        destination.getCheckInDate());
                using(ctx -> ((Accommodation) ctx.getSource()).getCheckInDate().toLocalTime()).map(source,
                        destination.getCheckInTime());
                using(ctx -> ((Accommodation) ctx.getSource()).getCheckInDate().toLocalDate()).map(source,
                        destination.getCheckOutDate());
                using(ctx -> ((Accommodation) ctx.getSource()).getCheckInDate().toLocalTime()).map(source,
                        destination.getCheckOutTime());
            }
        };
    }

    private static PropertyMap<Flight, FlightReport> getFlightsPropertyMap() {
        return new PropertyMap<>() {
            @Override
            protected void configure() {
                using(ctx -> ((Flight) ctx.getSource()).getArrivalDate().toLocalDate()).map(source,
                        destination.getArrivalDate());
                using(ctx -> ((Flight) ctx.getSource()).getArrivalDate().toLocalTime()).map(source,
                        destination.getArrivalTime());
                using(ctx -> ((Flight) ctx.getSource()).getArrivalDate().toLocalDate()).map(source,
                        destination.getDepartureDate());
                using(ctx -> ((Flight) ctx.getSource()).getArrivalDate().toLocalTime()).map(source,
                        destination.getDepartureTime());
            }
        };
    }
}
