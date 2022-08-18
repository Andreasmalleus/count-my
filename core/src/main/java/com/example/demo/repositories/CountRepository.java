package com.example.demo.repositories;

import org.springframework.stereotype.Repository;

import com.example.demo.models.Count;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CountRepository extends JpaRepository<Count, Integer> {
  Count findByIdentifier(UUID identifier);

  void deleteByIdentifier(UUID identifier);
}
