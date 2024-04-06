package org.web.application.personalproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.service.UserService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @GetMapping("/api/login")
    public String Login() {
        return "Login GET";
    }

    //Todo: spring security 추가
    @PostMapping("/api/login")
    public String Login(@RequestBody UserDTO user) {
        return userService.login(user);
    }

    @PostMapping("/api/register")
    public String Register(@RequestBody UserDTO user){
        return userService.register(user);
//        return "Email: " + user.getEmail() +
//                " Name: " + user.getName() +
//                " ID: " + user.getId() +
//                " Password: " + user.getPassword();
    }
}
