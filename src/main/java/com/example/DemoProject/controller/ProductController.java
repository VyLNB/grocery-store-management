package com.example.DemoProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.DemoProject.service.ProductService;
import com.example.DemoProject.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //GetMapping: annotation định tuyến route cho phương thức GET
    @GetMapping // Khi vào /products sẽ hiển thị tất cả sản phẩm
    public String getAllProducts(Model model){ 
        model.addAttribute("products", productService.getAll());
        return "productList";
    }

    @GetMapping("/addProduct") // Khi vào /products/addProduct sẽ thêm sản phẩm mẫu
    public String addProduct (Model model){
        model.addAttribute("product", new Product());
        return "productForm"; // trả về trang product-form.html
    }

    @PostMapping("/saveProduct") // Xử lý lưu sản phẩm từ form
    public String saveProduct(@ModelAttribute Product product){
        productService.saveProduct(product);
        return "redirect:/products"; // Quay về trang danh sách sản phẩm
    }

    @GetMapping("/deleteProduct/{id}") // Xử lý xóa sản phẩm
    public String deleteProduct(@PathVariable Long id){
        productService.deleteById(id);
        return "redirect:/products"; // Quay về trang danh sách sản phẩm    
    }

    @GetMapping("/updateProduct/{id}") // Xử lý cập nhật sản phẩm từ form
    public String updateProduct(@PathVariable Long id, Model model){
        model.addAttribute("product", productService.getById(id));
        return "productForm"; // trả về trang product-form.html
    }
}
