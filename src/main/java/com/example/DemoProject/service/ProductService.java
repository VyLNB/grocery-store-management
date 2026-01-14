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

    // Lấy tất cả sản phẩm
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // Lấy sản phẩm theo ID
    public Product getProductById (Long id){
        return productRepository.findById(id).orElse(null);
    }

    // Tạo sản phẩm mới
    public Product createProduct (Product product){
        return productRepository.save(product);
    }

    // Xóa sản phẩm theo ID
    public boolean deleteProductById (Long id){
        if (productRepository.existsById(id)){
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Cập nhật sản phẩm 
    public Product updateProductById(Long id, Product newProduct){
        Product existingProduct = productRepository.findById(id).orElse(null);

        // không tồn tại sản phẩm
        if (existingProduct == null){
            return null;
        } 

        // cần tối ưu sau
        if (newProduct.getCategory() != null) {
            existingProduct.setCategory(newProduct.getCategory());
        }
        if (newProduct.getName() != null){
            existingProduct.setName(newProduct.getName());
        }
        if (newProduct.getPrice() != null){
            existingProduct.setPrice(newProduct.getPrice());
        }
        if (newProduct.getQuantity() != null){
            existingProduct.setQuantity(newProduct.getQuantity());
        }
        if (newProduct.getStatus() != null){
            existingProduct.setStatus(newProduct.getStatus());
        }
        if (newProduct.getStock() != null){
            existingProduct.setStock(newProduct.getStock());
        }
        if (newProduct.getUnit() != null){
            existingProduct.setUnit(newProduct.getUnit());
        }

        return productRepository.save(existingProduct);
    }
}
