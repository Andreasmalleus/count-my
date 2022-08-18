package com.example.demo.controllers;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Count;
import com.example.demo.repositories.CountRepository;
import com.example.demo.types.ErrorResponse;
import com.example.demo.types.SuccessResponse;

@Transactional
@RestController
public class DataController {

  @Autowired
  private CountRepository repository;

  @RequestMapping(value = "/data", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> getData(@RequestParam("identifier") String identifier) {
    Count count;
    try {
      UUID uuid = UUID.fromString(identifier);
      count = repository.findByIdentifier(uuid);
    } catch (IllegalArgumentException e) {
      return ErrorResponse.createError(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    if (count == null) {
      return ErrorResponse.createError("Identifier was wrong", HttpStatus.BAD_REQUEST);
    }
    return SuccessResponse.createResponse(count, HttpStatus.OK);
  }

  @RequestMapping(value = "/data", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> deleteData(@RequestParam("identifier") String identifier) {
    System.out.println(identifier + "identifier isheer");
    try {
      UUID uuid = UUID.fromString(identifier);
      repository.deleteByIdentifier(uuid);
    } catch (IllegalArgumentException e) {
      return ErrorResponse.createError(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    return SuccessResponse.createResponse(true, HttpStatus.OK);
  }
}
