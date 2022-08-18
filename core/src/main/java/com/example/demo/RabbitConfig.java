package com.example.demo;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//tags the class as the source of bean definitions
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

  // tool for sending messages
  @Bean
  public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
    RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
    // send and receive methods timeout at 5 seconds by default
    // increase for because bigger messages require more time
    rabbitTemplate.setReplyTimeout(20000);// 2s
    rabbitTemplate.setReplyAddress(REPLY_QUEUE);
    return rabbitTemplate;
  }

  @Bean
  public SimpleMessageListenerContainer replyContainer(ConnectionFactory connectionFactory) {
    SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
    container.setConnectionFactory(connectionFactory);
    container.setQueueNames(REPLY_QUEUE);
    container.setMessageListener(rabbitTemplate(connectionFactory));
    return container;
  }

}
