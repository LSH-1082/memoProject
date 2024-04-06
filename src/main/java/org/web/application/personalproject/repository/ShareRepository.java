package org.web.application.personalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.web.application.personalproject.entity.ShareEntity;

@Repository
public interface ShareRepository extends JpaRepository<ShareEntity, Long> {
}
