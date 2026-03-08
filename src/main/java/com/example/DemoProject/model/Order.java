package com.example.DemoProject.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Table(name = "orders")
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderCode;

    private Double totalAmount;

    private Double tax;

    private Double finalAmount;

    private String paymentMethod;

    private String status;

    private LocalDateTime createdAt;

    // user tạo đơn
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // danh sách sản phẩm trong đơn
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
