package com.example.demo.models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.vladmihalcea.hibernate.type.json.JsonType;

@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
@Table(name = "counts")
public class Count {

  protected Count() {
  }

  public Count(String data, UUID identifier) {
    this.data = data;
    this.identifier = identifier;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Type(type = "pg-uuid")
  @Column(name = "identifier", unique = true)
  private UUID identifier;

  @Type(type = "json")
  @Column(name = "data", columnDefinition = "json")
  private String data;

  public Integer getId() {
    return this.id;
  }

  public String getData() {
    return this.data;
  }

  public UUID getIdentifier() {
    return this.identifier;
  }
}
