package com.example.DemoProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.DemoProject.DTO.ApiResponse;
import com.example.DemoProject.DTO.Order.OrderRequest;
import com.example.DemoProject.model.Order;
import com.example.DemoProject.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<Order>> checkout(@RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest);
        if (order == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Checkout failed"));
        }
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(order,"Order created successfully"));
    }
}
