package com.example.demo;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableRabbit
@SpringBootApplication
public class CoreApplication {

  @Value("${env.WEB_HOST}")
  private String web_host;

  @Value("${env.WEB_PORT}")
  private String web_port;

  public static void main(String[] args) throws InterruptedException {
    SpringApplication.run(CoreApplication.class, args);
  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {

    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedMethods("*")
            .allowedOrigins("http://" + web_host + ":" + web_port);
      }
    };
  }
}