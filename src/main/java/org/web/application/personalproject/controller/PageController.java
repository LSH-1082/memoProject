package org.web.application.personalproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.web.application.personalproject.dto.CategoryDTO;
import org.web.application.personalproject.dto.PageDTO;
import org.web.application.personalproject.service.PageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/page")
public class PageController {
    private final PageService pageService;

    @PostMapping("/info")
    public List<PageDTO> getPageInfo(@RequestBody CategoryDTO dto) {
        return pageService.getPageInfo(dto);
    }

    @PostMapping("/add")
    public boolean addPage(@RequestBody PageDTO dto) {
        return pageService.addPage(dto);
    }

    @PostMapping("/delete")
    public boolean deletePage(@RequestBody PageDTO dto) {
        return pageService.deletePage(dto);
    }

    @PostMapping("/save")
    public boolean savePage(@RequestBody PageDTO dto){
        return pageService.savePage(dto);
    }
}
