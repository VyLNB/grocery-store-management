package com.example.DemoProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.DemoProject.model.Product;

// Viết sẵn các phương thức CRUD cơ bản
public interface ProductRepository extends JpaRepository<Product, Long> {

}
