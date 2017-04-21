package com.linksinnovation.elearning.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**").addResourceLocations("file:///mnt/data/images/");
        registry.addResourceHandler("/files/**").addResourceLocations("file:///mnt/data/files/");
    }
}
