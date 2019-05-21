package com.idemia.ip.office.backend.delegation.assistant.security.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.web.cors.CorsConfiguration.ALL;

@Configuration
public class CorsWebFilter {
    @Bean
    @Profile("dev")
    CorsConfigurationSource corsDevConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
        config.setAllowedMethods(Arrays.asList(ALL));
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    @Profile("prod")
    CorsConfigurationSource corsProdConfigurationSource(@Value("${cors.origin}") String origin) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(origin));
        config.setAllowedMethods(Arrays.asList(ALL));
        config.setAllowedHeaders(Arrays.asList(ALL));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
