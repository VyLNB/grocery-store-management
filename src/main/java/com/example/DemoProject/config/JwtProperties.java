package com.example.DemoProject.config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    private String secret;

    private long accessTokenExpiration = 15 * 60 * 1000L;

    private long refreshTokenExpiration = 7 * 24 * 60 * 60 * 1000L;
}
