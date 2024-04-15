package org.web.application.personalproject.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.web.application.personalproject.dto.CategoryDTO;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.service.CategoryService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/info")
    public List<CategoryDTO> categoryInfo(@RequestHeader("Authorization") String header){
        return categoryService.findCategoryByJWT(header);
    }

    @PostMapping("/add")
    public String categoryAdd(@RequestHeader("Authorization") String header, @RequestBody CategoryDTO dto){
        return categoryService.addCategory(header, dto);
    }

    @PostMapping("/delete")
    public boolean categoryDelete(@RequestBody CategoryDTO dto){
        return categoryService.deleteCategory(dto);
    }
}
