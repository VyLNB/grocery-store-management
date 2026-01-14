package com.example.DemoProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.DemoProject.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
