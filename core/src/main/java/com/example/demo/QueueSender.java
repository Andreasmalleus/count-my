package com.example.demo;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;

@Component
public class QueueSender {

  @Autowired
  private RabbitTemplate rabbitTemplate;
  private Integer sendCount = 1;

  public void send(byte[] order, boolean finished) {
    final Map<String, Object> headers = new HashMap<>();
    headers.put("finished", finished);
    Message message = MessageBuilder.withBody(order).copyHeaders(headers).build();
    rabbitTemplate.send(RabbitConfig.EXCHANGE, RabbitConfig.MAIN_QUEUE, message);
  }

  public Message sendAndReceive(byte[] order, boolean finished) {
    final Map<String, Object> headers = new HashMap<>();
    headers.put("finished", finished);
    Message message = MessageBuilder.withBody(order).copyHeaders(headers).setCorrelationIdIfAbsent(sendCount.toString())
        .build();
    Message result = rabbitTemplate.sendAndReceive(RabbitConfig.EXCHANGE, RabbitConfig.MAIN_QUEUE, message);
    sendCount++;
    return result;
  }
}
