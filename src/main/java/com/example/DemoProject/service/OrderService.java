package com.example.DemoProject.service;

import org.springframework.stereotype.Service;

import com.example.DemoProject.DTO.Order.OrderItemRequest;
import com.example.DemoProject.DTO.Order.OrderRequest;
import com.example.DemoProject.model.*;
import com.example.DemoProject.repository.*;
import java.util.*;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        ProductRepository productRepository){

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    // "thanh toán" --> tạo đơn hàng
    public Order createOrder(OrderRequest orderRequest) {
        
        Order order = new Order();
        double totalAmount = 0.0;

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest item: orderRequest.getItems()){
            Product product = productRepository.findById(item.getProductId()).orElse(null);

            if (product == null){
                return null;
            }

            double subtotal = product.getPrice() * item.getQuantity();
            totalAmount += subtotal;

            OrderItem orderItem = new OrderItem();

            orderItem.setProductId(product.getId());
            orderItem.setProductName(product.getName());
            orderItem.setPrice(product.getPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSubtotal(subtotal);

            orderItems.add(orderItem);

            // trừ kho
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        double tax = totalAmount * 0.08;
        double finalAmount = totalAmount + tax;

        order.setTotalAmount(totalAmount);
        order.setTax(tax);
        order.setFinalAmount(finalAmount);
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setStatus("PAID");

        Order savedOrder = orderRepository.save(order);

        // lưu order item
        for(OrderItem item : orderItems){
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
