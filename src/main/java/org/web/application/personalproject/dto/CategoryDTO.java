package org.web.application.personalproject.dto;

import lombok.*;
import org.web.application.personalproject.entity.UserEntity;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private String email;
    private String categoryName;
    private LocalDateTime create_date;
    private LocalDateTime modify_date;
    private UserEntity owner;
}
