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
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String img;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column(nullable = false)
    private LocalDateTime modifyDate;


    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<CategoryEntity> categories = new ArrayList<>();

    public  void addCategory(CategoryEntity categoryEntity){
        categories.add(categoryEntity);
    }

    @OneToMany(mappedBy = "usersIdx", cascade = CascadeType.PERSIST)
    private List<MessageEntity> messages = new ArrayList<>();

    public  void addMessage(MessageEntity messageEntity){
        messages.add(messageEntity);
    }

    @OneToMany(mappedBy = "usersIdx", cascade = CascadeType.PERSIST)
    private List<ShareEntity> shares = new ArrayList<>();

    public  void addShare(ShareEntity shareEntity) {
        shares.add(shareEntity);
    }
}
