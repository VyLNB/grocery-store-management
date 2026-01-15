package com.example.DemoProject.service;

import org.springframework.stereotype.Service;

import com.example.DemoProject.repository.CategoryRepository;
import com.example.DemoProject.model.Category;
import java.util.*;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElse(null);
    }

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

    public boolean deleteCategoryById(Long id){
        if (categoryRepository.existsById(id)){
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Category updateCategoryById(Long id, Category newCategory){
        Category existingCategory = categoryRepository.findById(id).orElse(null);

        if (existingCategory == null){
            return null;
        }
        if (newCategory.getName() != null){
            existingCategory.setName(newCategory.getName());
        }

        return categoryRepository.save(newCategory);
    }
}
