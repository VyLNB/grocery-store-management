package com.example.DemoProject.DTO.Login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String accessToken;
    private UserDetail user; // Object lồng bên trong

    // Class con để định nghĩa cấu trúc của field "user"
    @Data
    @AllArgsConstructor
    public static class UserDetail {
        private Long id;
        private String email;
        private String username;
    }
}