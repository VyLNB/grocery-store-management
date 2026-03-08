package com.example.DemoProject.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "order_items")
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String productName;

    private Double price;

    private Integer quantity;

    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
