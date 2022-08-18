package com.example.demo.repositories;

import org.springframework.stereotype.Repository;

import com.example.demo.models.Count;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CountRepository extends JpaRepository<Count, Integer> {
  // methods here are created automatically during runtime
  // class that implements this interface is created automatically
}
