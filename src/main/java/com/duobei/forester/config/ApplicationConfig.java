package com.duobei.forester.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;

/**
 * spring 的javaconfig配置
 */
@Configuration
@PropertySource(value = "classpath:app.properties")
@ComponentScan(basePackages = "com.duobei.forester", excludeFilters = {
        @ComponentScan.Filter(Controller.class),
        @ComponentScan.Filter(ControllerAdvice.class),
        @ComponentScan.Filter(Configuration.class)})
public class ApplicationConfig {


    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
