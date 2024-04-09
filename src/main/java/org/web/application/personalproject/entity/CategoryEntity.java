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
@Getter
@Setter
@Entity
@Table(name = "category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false)
    private String categoryName;

    @Column(nullable = false)
    private String categoryImg;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner")
    private UserEntity owner;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column(nullable = false)
    private LocalDateTime modifyDate;

    @OneToMany(mappedBy = "categoryIdx", cascade = CascadeType.REMOVE)
    private List<PageEntity> pages = new ArrayList<>();

    public void addPage(PageEntity pageEntity){
        pages.add(pageEntity);
    }

    @OneToMany(mappedBy = "categoryIdx", cascade = CascadeType.PERSIST)
    private List<MessageEntity> messages = new ArrayList<>();

    public  void addMessage(MessageEntity messageEntity){
        messages.add(messageEntity);
    }


    @OneToMany(mappedBy = "categoryIdx", cascade = CascadeType.PERSIST)
    private List<ShareEntity> shares = new ArrayList<>();

    public  void addShare(ShareEntity shareEntity){
        shares.add(shareEntity);
    }

}
