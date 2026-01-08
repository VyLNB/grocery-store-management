package com.example.DemoProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DemoProject.DTO.ApiResponse; // Nhớ import ApiResponse
import com.example.DemoProject.DTO.RegisterRequest;
import com.example.DemoProject.DTO.Login.LoginRequest;
import com.example.DemoProject.DTO.Login.LoginResponse;
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
    public ResponseEntity<ApiResponse<?>> register(@RequestBody @Validated RegisterRequest registerRequest ){
        userService.register(registerRequest);
        return ResponseEntity.ok(ApiResponse.success(null, "Đăng ký thành công"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
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