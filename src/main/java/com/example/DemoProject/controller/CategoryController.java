package com.example.DemoProject.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.DemoProject.DTO.ApiResponse;
import com.example.DemoProject.model.Category;
import com.example.DemoProject.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping // Tạo danh mục mới
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        Category newCategory = categoryService.createCategory(category);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(newCategory, "Category created successfully"));
    }

    @GetMapping //Lấy tất cả
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategory(){
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success(categories, "Get all categories successfully"));
    }

    @PutMapping("/{id}") //Cập nhập
    public ResponseEntity<ApiResponse<Category>> updateCategory(
        @PathVariable Long id,
        @RequestBody Category category
    ){
        Category updatedCategory = categoryService.updateCategoryById(id, category);
        if(updatedCategory == null){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Category not found with id: " + id));
        }
        return ResponseEntity.ok(ApiResponse.success(updatedCategory, "Category updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletecCategory(@PathVariable Long id) {
        boolean isDeleted = categoryService.deleteCategoryById(id);
        if (!isDeleted) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Category not found with id: " + id));
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Category deleted successfully"));
    }
}
