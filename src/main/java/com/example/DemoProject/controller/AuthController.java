package com.example.DemoProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.DemoProject.DTO.ApiResponse; 
import com.example.DemoProject.DTO.Login.LoginRequest;
import com.example.DemoProject.DTO.Login.LoginResponse;
import com.example.DemoProject.DTO.Register.RegisterRequest;
import com.example.DemoProject.DTO.Register.RegisterResponse;
import com.example.DemoProject.service.UserService;
import com.example.DemoProject.model.User;
import com.example.DemoProject.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(
            @RequestBody RegisterRequest request) {
        ApiResponse<RegisterResponse> response = userService.register(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response) {
        LoginResponse loginResponse = userService.login(request);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Tạo Refresh Token
        String refreshToken = userService.createRefreshToken(user);

        // 4. Tạo Cookie
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);

        response.addCookie(cookie);

        return ResponseEntity.ok(ApiResponse.success(loginResponse, "Login successful"));
    }
}