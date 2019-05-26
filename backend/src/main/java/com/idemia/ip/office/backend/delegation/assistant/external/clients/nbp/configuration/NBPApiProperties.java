package com.idemia.ip.office.backend.delegation.assistant.external.clients.nbp.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ConfigurationProperties(prefix = "clients.api.nbp")
@Getter
@Setter
public class NBPApiProperties {

    private String exchangeUri;

    private String url;
}
