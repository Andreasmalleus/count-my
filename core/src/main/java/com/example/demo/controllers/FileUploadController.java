package com.example.demo.controllers;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;

import org.springframework.amqp.core.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.QueueSender;
import com.example.demo.types.ErrorResponse;
import com.example.demo.types.SuccessResponse;

import org.springframework.amqp.core.MessageProperties;

@RestController
public class FileUploadController {

  @Autowired
  private QueueSender queueSender;
  private Integer chunkSize = 20971520;// 20MB / MAX message size 2GB / recommended 128MB

  @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
    FileInputStream is = (FileInputStream) file.getInputStream();// read file into stream

    boolean finished = false;

    Message result;
    byte[] buffer = new byte[chunkSize];

    if (is.available() < chunkSize) {
      buffer = new byte[is.available()];
    }
    int rc = is.read(buffer);
    while (true) {
      if (rc < chunkSize) {
        finished = true;
        result = queueSender.sendAndReceive(buffer, finished);
        System.out.println("sending last");
        break;
      }
      System.out.println("sending");
      queueSender.send(buffer, finished);
      rc = is.read(buffer);
    }

    if (result == null) {
      return new ResponseEntity<ErrorResponse>(new ErrorResponse("Something went wrong"), HttpStatus.BAD_REQUEST);
    }

    MessageProperties properties = result.getMessageProperties();
    String correlationId = properties.getCorrelationId();
    System.out.println(correlationId);
    // Get response header information
    HashMap<String, Object> headers = (HashMap<String, Object>) properties.getHeaders();
    // Access server Message returned id
    String msgId = (String) headers.get("spring_returned_message_correlation");
    if (!msgId.equals(correlationId)) {
      return new ResponseEntity<ErrorResponse>(new ErrorResponse("correlation id conflict"), HttpStatus.BAD_REQUEST);
    }
    String identifier = new String(result.getBody());
    return new ResponseEntity<SuccessResponse>(new SuccessResponse(identifier), HttpStatus.OK);
  }
}
