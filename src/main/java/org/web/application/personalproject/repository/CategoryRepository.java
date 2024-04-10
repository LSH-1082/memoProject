package org.web.application.personalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.web.application.personalproject.entity.CategoryEntity;
import org.web.application.personalproject.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    List<CategoryEntity> findByOwner(UserEntity owner);
    Integer deleteByCreateDate(LocalDateTime time);

    CategoryEntity findByCreateDate(LocalDateTime time);
}
