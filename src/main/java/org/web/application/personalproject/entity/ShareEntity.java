package org.web.application.personalproject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "share")
public class ShareEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "users_idx")
    private UserEntity usersIdx;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_idx")
    private CategoryEntity categoryIdx;

}
