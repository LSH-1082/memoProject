package org.web.application.personalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.web.application.personalproject.entity.PageEntity;


@Repository
public interface PageRepository extends JpaRepository<PageEntity, Long> {
}
