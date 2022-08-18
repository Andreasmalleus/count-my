package com.example.demo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.example.demo.models.Count;
import com.example.demo.repositories.CountRepository;
import com.example.demo.utils.TextProccessor;
import com.google.gson.Gson;

import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;

@Component
public class QueueConsumer {

  @Autowired
  private CountRepository repository;

  @Autowired
  RabbitTemplate rabbitTemplate;

  final TextProccessor textProccessor = new TextProccessor();

  @RabbitListener(queues = RabbitConfig.MAIN_QUEUE)
  public void receive(@Payload Message message) throws IOException {

    MessageProperties properties = message.getMessageProperties();
    Map<String, Object> headers = properties.getHeaders();
    boolean isFinished = (Boolean) headers.get("finished");

    String text = new String(message.getBody(), StandardCharsets.UTF_8);
    textProccessor.processeText(text);

    if (isFinished) {
      Map<String, Integer> map = textProccessor.getProcessedText();

      Gson gson = new Gson();
      String jsonStr = gson.toJson(map);

      UUID generatedUUID = UUID.randomUUID();
      Count count = new Count(jsonStr, generatedUUID);
      repository.save(count);

      Message build = MessageBuilder.withBody((generatedUUID.toString()).getBytes()).build();
      CorrelationData correlationData = new CorrelationData(message.getMessageProperties().getCorrelationId());
      rabbitTemplate.sendAndReceive(RabbitConfig.EXCHANGE, RabbitConfig.REPLY_QUEUE, build, correlationData);

      // EMPTY THE ARRAY
      textProccessor.clearProcessedText();
      System.out.printf("added %s \n", jsonStr);
    }
  }
}
