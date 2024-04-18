package org.web.application.personalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.entity.CategoryEntity;
import org.web.application.personalproject.entity.PageEntity;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface PageRepository extends JpaRepository<PageEntity, Long> {
    List<PageEntity> findByCategoryIdx(CategoryEntity entity);
    Integer deleteByCreateDate(LocalDateTime time);

    PageEntity findByCreateDate(LocalDateTime time);

    @Query("select p from UserEntity u join u.categories c join c.pages p where u.email = :email")
    List<PageEntity> findAllPage(@Param("email") String email);
}
