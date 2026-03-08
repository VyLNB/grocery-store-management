package com.example.DemoProject.repository;

import com.example.DemoProject.model.Order;
import com.example.DemoProject.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderCode(String orderCode);

    Optional<Order> findByUser(User user);
}
