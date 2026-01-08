package com.example.DemoProject.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.DemoProject.DTO.RegisterRequest;
import com.example.DemoProject.DTO.Login.LoginRequest;
import com.example.DemoProject.DTO.Login.LoginResponse;
import com.example.DemoProject.model.User;
import com.example.DemoProject.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);
    }

    // ... imports

    public LoginResponse login(LoginRequest loginRequest) {
        // 1. Tìm user và kiểm tra password (như cũ)
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        // 2. Tạo token (như cũ)
        String accessToken = jwtService.generateAccessToken(user);

        // 3. Tạo UserDetail (struct bên trong)
        // Lưu ý: Nếu Entity User chưa có getRole(), bạn có thể hardcode hoặc thêm field
        // vào Entity
        LoginResponse.UserDetail userDetail = new LoginResponse.UserDetail(
                user.getId(),
                user.getEmail(),
                user.getUsername() // Hoặc user.getRole() nếu bạn đã thêm field role vào Entity
        );

        // 4. Trả về LoginResponse với cấu trúc lồng nhau
        return new LoginResponse(accessToken, userDetail);
    }

    public String createRefreshToken(User user) {
        return jwtService.generateRefreshToken(user);
    }
}
