package com.example.DemoProject.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor //khởi tạo không tham số
@AllArgsConstructor //khởi tạo có tham số

public class Product {
    @Id // khóa chính của bảng
    @GeneratedValue(strategy = GenerationType.IDENTITY) //MySQL tự động tăng id
    private Long id;

    private String name;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private String unit; // đơn vị tính: kg, cái, gói...
    private Integer quantity; 
    private Double price;
    private Integer stock; //số lượng tồn kho
    private Boolean status;
}
