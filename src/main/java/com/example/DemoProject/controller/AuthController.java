package com.example.DemoProject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;


import com.example.DemoProject.DTO.RegisterRequest;
import com.example.DemoProject.DTO.LoginRequest;
import com.example.DemoProject.model.User;
import com.example.DemoProject.service.UserService;

@Controller
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated RegisterRequest registerRequest){
        userService.register(registerRequest);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginRequest loginRequest){
        User user = userService.login(loginRequest);
        return ResponseEntity.ok("Đăng nhập thành công. Chào mừng " + user.getUsername());
    }
}
