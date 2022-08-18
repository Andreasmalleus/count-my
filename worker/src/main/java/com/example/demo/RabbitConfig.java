package com.example.demo;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitConfig {
  public static final String MAIN_QUEUE = "main";
  public static final String REPLY_QUEUE = "reply";
  public static final String EXCHANGE = "count_exchange";

  @Bean
  public Queue mainQueue() {
    return new Queue(MAIN_QUEUE);
  }

  @Bean
  public Queue replyQueue() {
    return new Queue(REPLY_QUEUE);
  }

  @Bean
  public TopicExchange exchange() {
    return new TopicExchange(EXCHANGE);
  }

  @Bean
  public Binding mainBinding() {
    return BindingBuilder.bind(mainQueue()).to(exchange()).with(MAIN_QUEUE);
  }

  @Bean
  public Binding replyBinding() {
    return BindingBuilder.bind(replyQueue()).to(exchange()).with(REPLY_QUEUE);
  }
}
