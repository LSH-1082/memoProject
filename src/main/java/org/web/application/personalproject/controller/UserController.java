package org.web.application.personalproject.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public String userInfo(@RequestHeader("Authorization") String header) {
        return "info";
    }

    @PostMapping("/delete")
    public String userDelete(@RequestBody UserDTO dto) {
        return userService.delete(dto);
    }
}
