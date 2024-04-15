package org.web.application.personalproject.controller;

import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public String Register(@RequestBody UserDTO dto) {
        return userService.register(dto);
    }

    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@RequestHeader("Authorization") String header) {
        return userService.getUserInfo(header);
    }

    @GetMapping("/delete")
    public String userDelete(@RequestHeader("Authorization") String header) {
        return userService.delete(header);
    }
}
