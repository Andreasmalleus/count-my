package com.example.demo.types;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SuccessResponse {

  private Object payload;

  public SuccessResponse(Object payload) {
    this.payload = payload;
  }

  public void setPayload(String payload) {
    this.payload = payload;
  }

  public Object getPayload() {
    return this.payload;
  }

  public static ResponseEntity<SuccessResponse> createResponse(Object payload, HttpStatus status) {
    return new ResponseEntity<SuccessResponse>(new SuccessResponse(payload), status);
  }

}
