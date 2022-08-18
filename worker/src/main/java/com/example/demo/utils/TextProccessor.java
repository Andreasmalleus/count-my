package com.example.demo.utils;

import java.util.HashMap;
import java.util.Map;

public class TextProccessor {

  Map<String, Integer> processedText = new HashMap<>();

  public void processeText(String text) {
    // removes all special characters excepts alphanumeric characters in all
    // languages
    String withoutSpecial = text.replaceAll("[^\\p{L}\\p{Z}]", " ");
    String formattedText = withoutSpecial.replaceAll("/  +/g", " ");
    String[] words = formattedText.split(" ");
    for (int i = 0; i < words.length; i++) {
      String word = words[i].trim().toLowerCase();
      if (word != "") {
        processedText.merge(word, 1, Integer::sum);
      }
    }
  }

  public Map<String, Integer> getProcessedText() {
    return this.processedText;
  }

  public void clearProcessedText() {
    processedText = new HashMap<>();
  }

}
