package org.web.application.personalproject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web.application.personalproject.dto.CategoryDTO;
import org.web.application.personalproject.dto.PageDTO;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.entity.CategoryEntity;
import org.web.application.personalproject.entity.PageEntity;
import org.web.application.personalproject.entity.UserEntity;
import org.web.application.personalproject.repository.CategoryRepository;
import org.web.application.personalproject.repository.PageRepository;
import org.web.application.personalproject.repository.UserRepository;
import org.web.application.personalproject.security.filter.JWTUtil;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final PageRepository pageRepository;
    private final JWTUtil jwtUtil;


    public List<CategoryDTO> findCategoryByJWT(String header) {
        String jwt = header.replace("Bearer ", "");
        String email = jwtUtil.getUsername(jwt);
        UserEntity userEntity = userRepository.findByEmail(email);
        List<CategoryEntity> categoryEntityList = categoryRepository.findByOwner(userEntity);
        List<CategoryDTO> categoryDTOList = new ArrayList<>();

        for (CategoryEntity categoryEntity : categoryEntityList) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setCategoryName(categoryEntity.getCategoryName());
            categoryDTO.setCreate_date(categoryEntity.getCreateDate());
            categoryDTO.setDescription(categoryEntity.getDescription());
            categoryDTO.setModify_date(categoryEntity.getModifyDate());

            categoryDTOList.add(categoryDTO);
        }
        return categoryDTOList;
    }

    public CategoryDTO findOneInfo(CategoryDTO dto) {
        CategoryEntity entity = categoryRepository.findByCreateDate(dto.getCreate_date());
        return CategoryDTO.builder()
                .categoryName(entity.getCategoryName())
                .description(entity.getDescription())
                .build();
    }

    public Boolean modifyCategory(CategoryDTO dto) {
        try {
            CategoryEntity entity = categoryRepository.findByCreateDate(dto.getCreate_date());
            entity.setCategoryName(dto.getCategoryName());
            entity.setDescription(dto.getDescription());
            entity.setModifyDate(LocalDateTime.now());
            categoryRepository.save(entity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String addCategory(String header, CategoryDTO dto) {
        try {
            String jwt = header.replace("Bearer ", "");
            String test = jwtUtil.getUsername(jwt);
            userRepository.findByEmail(test);
            CategoryEntity entity = CategoryEntity.builder()
                    .categoryName(dto.getCategoryName())
                    .categoryImg("default")
                    .owner(userRepository.findByEmail(jwtUtil.getUsername(jwt)))
                    .description(dto.getDescription())
                    .createDate(LocalDateTime.now())
                    .modifyDate(LocalDateTime.now())
                    .build();
            categoryRepository.save(entity);

            PageEntity pageEntity = PageEntity.builder()
                    .pageName("First Page")
                    .pageContent("")
                    .createDate(LocalDateTime.now())
                    .modifyDate(LocalDateTime.now())
                    .categoryIdx(entity)
                    .build();
            pageRepository.save(pageEntity);
            return "Category add success";
        } catch (Exception e) {
            log.error(e.toString());
            return "Category add failed";
        }
    }

    @Transactional
    public boolean deleteCategory(CategoryDTO dto) {
        return categoryRepository.deleteByCreateDate(dto.getCreate_date()) > 0;
    }
}
