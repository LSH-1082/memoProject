package org.web.application.personalproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public String Login() {
        return "Login GET";
    }

    //Todo: spring security 추가
    @PostMapping("/login")
    public String Login(@RequestBody UserDTO user) {
        return userService.login(user);
    }

    @PostMapping("/register")
    public String Register(@RequestBody UserDTO user){
        return userService.register(user);
    }

    @PostMapping("/info")
    public UserDTO userInfo(@RequestBody UserDTO dto){
        if(userService.getUserInfo(dto) == null){
            return null;
        }
        return userService.getUserInfo(dto);
    }

    @PostMapping("/delete")
    public String userDelete(@RequestBody UserDTO dto){
        return userService.delete(dto);
    }
}
