package com.example.DemoProject.DTO.Login;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;    
    private String email;
}
