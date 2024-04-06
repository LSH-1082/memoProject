package org.web.application.personalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.web.application.personalproject.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT COUNT(u) > 0 FROM UserEntity u WHERE u.email = :email")
    boolean existEmail(@Param("email") String email);

    @Query("SELECT u.idx FROM UserEntity u WHERE u.email = :email")
    Long findIdx(@Param("email") String email);

    @Query("SELECT u.password FROM UserEntity u WHERE u.idx = :idx")
    String findPassword(@Param("idx") Long idx);

}
