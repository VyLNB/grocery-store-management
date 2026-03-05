package com.example.DemoProject.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.DemoProject.DTO.ApiResponse;
import com.example.DemoProject.DTO.Login.*;
import com.example.DemoProject.DTO.Register.*;
import com.example.DemoProject.model.User;
import com.example.DemoProject.model.RefreshToken;
import com.example.DemoProject.repository.UserRepository;
import com.example.DemoProject.repository.RefreshTokenRepository;
import com.example.DemoProject.config.JwtProperties;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProperties jwtProperties;

    public ApiResponse<RegisterResponse> register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) { 
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        User newUser = userRepository.save(user);

        RegisterResponse response = new RegisterResponse(newUser.getId(), newUser.getUsername(), newUser.getEmail());
        return ApiResponse.success(response, "Đăng ký thành công");
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsernameOrEmail(loginRequest.getUsername(), loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        String accessToken = jwtService.generateAccessToken(user);
        LoginResponse.UserDetail userDetail = new LoginResponse.UserDetail(
                user.getId(), user.getEmail(), user.getUsername());

        return new LoginResponse(accessToken, userDetail);
    }

    // Tạo và lưu refresh token vào DB, trả về token để đính kèm vào cookie
    public String createRefreshToken(User user) {
        String token = UUID.randomUUID().toString(); 

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(token)
                .expiresAt(Instant.now().plusMillis(jwtProperties.getRefreshTokenExpiration()))
                .revoked(false)
                .build();

        refreshTokenRepository.save(refreshToken);
        return token;
    }

    // xác thực refresh token, nếu hợp lệ thì tạo access token mới
    public LoginResponse refreshAccessToken(String requestRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(requestRefreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token không tồn tại!"));

        if (refreshToken.isRevoked()) {
            throw new RuntimeException("Refresh token đã bị thu hồi!");
        }

        if (refreshToken.isExpired()) {
            refreshTokenRepository.delete(refreshToken); // Xóa token hết hạn cho sạch DB
            throw new RuntimeException("Refresh token đã hết hạn. Vui lòng đăng nhập lại!");
        }

        User user = refreshToken.getUser();
        String newAccessToken = jwtService.generateAccessToken(user);

        LoginResponse.UserDetail userDetail = new LoginResponse.UserDetail(
                user.getId(), user.getEmail(), user.getUsername());

        return new LoginResponse(newAccessToken, userDetail);
    }

    // thu hồi refresh token khi người dùng đăng xuất
    public void revokeRefreshToken(String token) {
        refreshTokenRepository.findByToken(token).ifPresent(rt -> {
            rt.setRevoked(true);
            refreshTokenRepository.save(rt);
        });
    }
}