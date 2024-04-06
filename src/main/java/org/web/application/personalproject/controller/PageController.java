package org.web.application.personalproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PageController {

    @GetMapping("/api/main")
    public String Page() {
        //메인페이지 GET 요청시 내가 가지고 있거나
        // 공유되어지고 있는 카테고리&메세지 정보 리턴
        return "Page GET";
    }
}
