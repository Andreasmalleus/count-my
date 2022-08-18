package com.example.demo.utils;

import java.io.IOException;

public class MessageConsumer {
  byte[] a = new byte[0];

  public void concatenateMessages(byte[] b) throws IOException {
    // byte array will be the size of two arrays
    // copy both to a new array
    byte[] c = new byte[a.length + b.length];
    System.arraycopy(a, 0, c, 0, a.length);
    System.arraycopy(b, 0, c, a.length, b.length);
    this.a = c;
  }

  public byte[] getFullMessage() {
    return this.a;
  }

  public void emptyMessage() throws IOException {
    this.a = new byte[0];
  }
}
