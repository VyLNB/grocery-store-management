package com.example.DemoProject.DTO.Register;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse {
    private Long id;
    private String username;
    private String email;
}
