package com.example.DemoProject.model;

import lombok.*;
import jakarta.persistence.*;


@Entity
@Getter @Setter
@NoArgsConstructor //khởi tạo không tham số
@AllArgsConstructor //khởi tạo có tham số
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //MySQL tự động tăng id
    private Long id;

    private String username;
    private String email;
    private String password;
}
