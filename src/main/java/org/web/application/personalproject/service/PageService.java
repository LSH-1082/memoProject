package org.web.application.personalproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web.application.personalproject.dto.CategoryDTO;
import org.web.application.personalproject.dto.PageDTO;
import org.web.application.personalproject.entity.CategoryEntity;
import org.web.application.personalproject.entity.PageEntity;
import org.web.application.personalproject.repository.CategoryRepository;
import org.web.application.personalproject.repository.PageRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class PageService {
    private final CategoryRepository categoryRepository;
    private final PageRepository pageRepository;

    public List<PageDTO> getPageInfo(CategoryDTO dto) {
        CategoryEntity categoryEntity = categoryRepository.findByCreateDate(dto.getCreate_date());
        List<PageEntity> pageEntityList = pageRepository.findByCategoryIdx(categoryEntity);
        List<PageDTO> pageDTOList = new ArrayList<>();

        for (PageEntity pageEntity : pageEntityList) {
            PageDTO pageDTO = PageDTO.builder()
                    .pageName(pageEntity.getPageName())
                    .pageContent(pageEntity.getPageContent())
                    .createDate(pageEntity.getCreateDate())
                    .modifyDate(pageEntity.getModifyDate())
                    .build();
            pageDTOList.add(pageDTO);
        }
        return pageDTOList;
    }

    public boolean addPage(PageDTO dto) {
        CategoryEntity categoryEntity = categoryRepository.findByCreateDate(dto.getCreateDate());
        try {
            PageEntity pageEntity = PageEntity.builder()
                    .pageName(dto.getPageName())
                    .pageContent("")
                    .createDate(LocalDateTime.now())
                    .modifyDate(LocalDateTime.now())
                    .categoryIdx(categoryEntity)
                    .build();
            pageRepository.save(pageEntity);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public boolean savePage(PageDTO dto){
        try{
            PageEntity pageEntity = pageRepository.findByCreateDate(dto.getCreateDate());
            if(!pageEntity.getPageName().equals(dto.getPageName()))
                pageEntity.setPageName(dto.getPageName());

            pageEntity.setPageContent(dto.getPageContent());
            pageEntity.setModifyDate(LocalDateTime.now());
            pageRepository.save(pageEntity);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @Transactional
    public boolean deletePage(PageDTO dto){
        return pageRepository.deleteByCreateDate(dto.getCreateDate()) > 0;
    }
}
