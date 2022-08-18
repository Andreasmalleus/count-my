package com.example.demo.types;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorResponse {
  private Object error;

  public ErrorResponse(Object error) {
    this.error = error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public Object getError() {
    return this.error;
  }

  public static ResponseEntity<ErrorResponse> createError(Object error, HttpStatus status) {
    return new ResponseEntity<ErrorResponse>(new ErrorResponse(error), status);
  }

}
