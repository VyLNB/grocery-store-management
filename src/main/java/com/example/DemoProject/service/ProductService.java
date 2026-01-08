package com.example.DemoProject.service;

import com.example.DemoProject.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.example.DemoProject.model.Product;
import java.util.*;
@Service

// Service xử lý nghiệp vụ liên quan đến Product
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public Product getById (Long id){
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct (Product product){
        return productRepository.save(product);
    }

    public void deleteById (Long id){
        productRepository.deleteById(id);
    }
}
