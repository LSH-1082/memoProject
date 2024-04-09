package org.web.application.personalproject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web.application.personalproject.dto.CategoryDTO;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.entity.CategoryEntity;
import org.web.application.personalproject.entity.PageEntity;
import org.web.application.personalproject.entity.UserEntity;
import org.web.application.personalproject.repository.CategoryRepository;
import org.web.application.personalproject.repository.PageRepository;
import org.web.application.personalproject.repository.UserRepository;

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


    public List<CategoryDTO> findCategoryByOwner(UserDTO userDTO){
        UserEntity userEntity = userRepository.findByEmail(userDTO.getEmail());
        List<CategoryEntity> categoryEntities = categoryRepository.findByOwner(userEntity);
        List<CategoryDTO> categoryDTOList = new ArrayList<>();

        for (CategoryEntity categoryEntity : categoryEntities) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setCategoryName(categoryEntity.getCategoryName());
            categoryDTO.setCreate_date(categoryEntity.getCreateDate());
            categoryDTO.setModify_date(categoryEntity.getModifyDate());
            categoryDTOList.add(categoryDTO);
        }
        return categoryDTOList;
    }

    public String addCategory(CategoryDTO dto){

        try{
            CategoryEntity entity = CategoryEntity.builder()
                    .categoryName(dto.getCategoryName())
                    .categoryImg("default")
                    .owner(userRepository.findByEmail(dto.getEmail()))
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
        }
        catch(Exception e){
            log.error(e.toString());
            return "Category add failed";
        }
    }

    @Transactional
    public boolean deleteCategory(CategoryDTO dto){
        return categoryRepository.deleteByCreateDate(dto.getCreate_date()) > 0;
    }
}
