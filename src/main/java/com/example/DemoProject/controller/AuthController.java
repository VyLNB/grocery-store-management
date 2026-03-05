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
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response) {
        
        LoginResponse loginResponse = userService.login(request);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Tạo Refresh Token và lưu vào DB
        String refreshToken = userService.createRefreshToken(user);

        // Đính kèm Refresh Token vào Cookie
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Đổi thành true nếu chạy trên HTTPS (Production)
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 ngày
        response.addCookie(cookie);

        return ResponseEntity.ok(ApiResponse.success(loginResponse, "Đăng nhập thành công"));
    }

    // làm mới token
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new RuntimeException("Không tìm thấy Refresh Token. Vui lòng đăng nhập lại!");
        }

        LoginResponse newLoginResponse = userService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success(newLoginResponse, "Làm mới token thành công"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {
        
        if (refreshToken != null) {
            // Đánh dấu token trong DB là đã bị thu hồi (revoked)
            userService.revokeRefreshToken(refreshToken);
        }

        // Xóa Cookie ở client
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Xóa ngay lập tức
        response.addCookie(cookie);

        return ResponseEntity.ok(ApiResponse.success(null, "Đăng xuất thành công"));
    }
}