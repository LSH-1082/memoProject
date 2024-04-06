package org.web.application.personalproject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "page")
public class PageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false)
    private String pageName;

    @Column(nullable = false)
    private String pageContent;


    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column(nullable = false)
    private LocalDateTime modifyDate;

    @OneToMany(mappedBy = "pageIdx", cascade = CascadeType.PERSIST)
    private List<CategoryEntity> categories = new ArrayList<>();

    public  void addCategory(CategoryEntity categoryEntity){
        categories.add(categoryEntity);
    }
}
