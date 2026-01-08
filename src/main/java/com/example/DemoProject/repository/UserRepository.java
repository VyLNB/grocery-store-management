package com.example.DemoProject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.DemoProject.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
