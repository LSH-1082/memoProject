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

    @GetMapping("/user/login")
    public String Login() {
        return "Login GET";
    }

    //Todo: spring security 추가
    @PostMapping("/user/login")
    public String Login(@RequestBody UserDTO user) {
        return userService.login(user);
    }

    @PostMapping("/user/register")
    public String Register(@RequestBody UserDTO user){
        return userService.register(user);
    }

    @PostMapping("/user/info")
    public UserDTO userInfo(@RequestBody UserDTO dto){
        return userService.getUserInfo(dto);
    }

    @PostMapping("/user/delete")
    public String userDelete(@RequestBody UserDTO dto){
        return userService.delete(dto);
    }
}
